import { APIRequestContext } from "@playwright/test";

/**
 * Interface for employee data
 */
export interface EmployeeData {
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  [key: string]: any;
}

/**
 * Interface for API response
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
}

/**
 * Get Authorization header
 * @param apiContext - The API context
 * @returns Authorization header value
 */
function getAuthHeader(): string {
  const credentials = `${process.env.USER_NAME}:${process.env.PASSWORD}`;
  const encoded = Buffer.from(credentials).toString("base64");
  return `Basic ${encoded}`;
}

/**
 * Get base API URL
 * @returns Base API URL
 */
function getBaseApiUrl(): string {
  return `${process.env.BASE_URL}/api/v1`;
}

/**
 * Create a new employee via API
 * @param apiContext - The API request context
 * @param employeeData - Employee data
 * @returns Created employee data
 *
 * Example:
 * const employee = await createEmployee(apiContext, {
 *   firstName: "John",
 *   lastName: "Doe",
 *   email: "john.doe@example.com"
 * });
 */
export async function createEmployee(
  apiContext: APIRequestContext,
  employeeData: EmployeeData
): Promise<any> {
  try {
    const response = await apiContext.post(
      `${getBaseApiUrl()}/admin/employees`,
      {
        headers: {
          Authorization: getAuthHeader(),
          "Content-Type": "application/json",
        },
        data: employeeData,
      }
    );

    if (!response.ok()) {
      throw new Error(`Failed to create employee: ${response.status()}`);
    }

    const json = await response.json();
    return json.data || json;
  } catch (error) {
    console.error("Error creating employee:", error);
    throw error;
  }
}

/**
 * Get employee data via API
 * @param apiContext - The API request context
 * @param employeeId - Employee ID
 * @returns Employee data
 *
 * Example:
 * const employee = await getEmployeeData(apiContext, "123");
 * console.log(employee.firstName);
 */
export async function getEmployeeData(
  apiContext: APIRequestContext,
  employeeId: string
): Promise<any> {
  try {
    const response = await apiContext.get(
      `${getBaseApiUrl()}/admin/employees/${employeeId}`,
      {
        headers: {
          Authorization: getAuthHeader(),
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok()) {
      throw new Error(`Failed to get employee: ${response.status()}`);
    }

    const json = await response.json();
    return json.data || json;
  } catch (error) {
    console.error("Error getting employee:", error);
    throw error;
  }
}

/**
 * Delete an employee via API
 * @param apiContext - The API request context
 * @param employeeId - Employee ID to delete
 * @returns Deletion response
 *
 * Example:
 * await deleteEmployee(apiContext, "123");
 */
export async function deleteEmployee(
  apiContext: APIRequestContext,
  employeeId: string
): Promise<any> {
  try {
    const response = await apiContext.delete(
      `${getBaseApiUrl()}/admin/employees/${employeeId}`,
      {
        headers: {
          Authorization: getAuthHeader(),
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok()) {
      throw new Error(`Failed to delete employee: ${response.status()}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error("Error deleting employee:", error);
    throw error;
  }
}

/**
 * Update employee data via API
 * @param apiContext - The API request context
 * @param employeeId - Employee ID
 * @param employeeData - Updated employee data
 * @returns Updated employee data
 *
 * Example:
 * const updated = await updateEmployee(apiContext, "123", {
 *   email: "newemail@example.com"
 * });
 */
export async function updateEmployee(
  apiContext: APIRequestContext,
  employeeId: string,
  employeeData: Partial<EmployeeData>
): Promise<any> {
  try {
    const response = await apiContext.put(
      `${getBaseApiUrl()}/admin/employees/${employeeId}`,
      {
        headers: {
          Authorization: getAuthHeader(),
          "Content-Type": "application/json",
        },
        data: employeeData,
      }
    );

    if (!response.ok()) {
      throw new Error(`Failed to update employee: ${response.status()}`);
    }

    const json = await response.json();
    return json.data || json;
  } catch (error) {
    console.error("Error updating employee:", error);
    throw error;
  }
}

/**
 * Get list of employees via API
 * @param apiContext - The API request context
 * @param limit - Number of results to return (default: 50)
 * @param offset - Number of results to skip (default: 0)
 * @returns Array of employees
 *
 * Example:
 * const employees = await getEmployeeList(apiContext, 10, 0);
 */
export async function getEmployeeList(
  apiContext: APIRequestContext,
  limit: number = 50,
  offset: number = 0
): Promise<any[]> {
  try {
    const response = await apiContext.get(
      `${getBaseApiUrl()}/admin/employees?limit=${limit}&offset=${offset}`,
      {
        headers: {
          Authorization: getAuthHeader(),
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok()) {
      throw new Error(`Failed to get employee list: ${response.status()}`);
    }

    const json = await response.json();
    return json.data || [];
  } catch (error) {
    console.error("Error getting employee list:", error);
    throw error;
  }
}

/**
 * Search employees via API
 * @param apiContext - The API request context
 * @param searchTerm - Search term (name, email, etc.)
 * @returns Array of matching employees
 *
 * Example:
 * const results = await searchEmployees(apiContext, "John");
 */
export async function searchEmployees(
  apiContext: APIRequestContext,
  searchTerm: string
): Promise<any[]> {
  try {
    const response = await apiContext.get(
      `${getBaseApiUrl()}/admin/employees?name=${searchTerm}`,
      {
        headers: {
          Authorization: getAuthHeader(),
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok()) {
      throw new Error(`Failed to search employees: ${response.status()}`);
    }

    const json = await response.json();
    return json.data || [];
  } catch (error) {
    console.error("Error searching employees:", error);
    throw error;
  }
}

/**
 * Generic API request helper
 * @param apiContext - The API request context
 * @param method - HTTP method (GET, POST, PUT, DELETE, etc.)
 * @param endpoint - API endpoint path
 * @param data - Request data (optional)
 * @returns Response data
 *
 * Example:
 * const result = await apiRequest(apiContext, "GET", "/admin/dashboard");
 */
export async function apiRequest(
  apiContext: APIRequestContext,
  method: string,
  endpoint: string,
  data?: any
): Promise<any> {
  try {
    const url = `${getBaseApiUrl()}${endpoint}`;

    const response = await apiContext.request(method, url, {
      headers: {
        Authorization: getAuthHeader(),
        "Content-Type": "application/json",
      },
      data: data,
    });

    if (!response.ok()) {
      throw new Error(
        `API request failed: ${response.status()} - ${response.statusText()}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error(`Error in ${method} request to ${endpoint}:`, error);
    throw error;
  }
}

/**
 * Verify API response is successful
 * @param response - API response object
 * @param expectedStatus - Expected status code
 * @throws Error if response is not successful
 */
export function verifyApiResponse(
  response: any,
  expectedStatus: number = 200
): void {
  if (!response.success) {
    throw new Error(
      `API request failed: ${response.message || "Unknown error"}`
    );
  }
}
