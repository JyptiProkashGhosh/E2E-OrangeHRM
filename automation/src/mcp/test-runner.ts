import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export interface TestOptions {
  project?: string;
  grep?: string;
  spec?: string;
  headless?: boolean;
}

export async function runPlaywrightTests(options: TestOptions): Promise<{ success: boolean; output: string }> {
  let command = 'npx playwright test';

  if (options.spec) {
    // Basic path sanitization to prevent shell injection
    const sanitizedSpec = options.spec.replace(/[^a-zA-Z0-9_\-\.\/\\ ]/g, '');
    command += ` ${sanitizedSpec}`;
  }

  if (options.project) {
    const sanitizedProject = options.project.replace(/[^a-zA-Z0-9_\-]/g, '');
    command += ` --project=${sanitizedProject}`;
  }

  if (options.grep) {
    const sanitizedGrep = options.grep.replace(/[^a-zA-Z0-9_@\- ]/g, '');
    command += ` --grep "${sanitizedGrep}"`;
  }

  if (options.headless !== undefined) {
    command += options.headless ? ' --headed=false' : ' --headed';
  }

  try {
    // Run command, force disabling colors for cleaner logs in the MCP response
    const { stdout, stderr } = await execAsync(command, {
      env: { ...process.env, FORCE_COLOR: '0' },
    });
    return {
      success: true,
      output: stdout + (stderr ? `\nStderr:\n${stderr}` : ''),
    };
  } catch (error: any) {
    return {
      success: false,
      output: `Test run failed with exit code ${error.code || 'unknown'}.\n\nOutput:\n${error.stdout || ''}\n\nErrors:\n${error.stderr || error.message || ''}`,
    };
  }
}
