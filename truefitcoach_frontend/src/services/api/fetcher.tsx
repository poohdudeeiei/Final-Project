import axios from "axios";

// GET DATA WITH ACCESS TOKEN
export const fetcher = async (url: string, token: string) => {
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: token,
      },
    });

    if (response.status !== 200) {
      throw new Error("Failed to fetch user data");
    }

    return response.data.userData;
  } catch (error) {
    throw new Error("Failed to fetch user data");
  }
};

export const fetchTypes = async (url: string) => {
  try {
    const response = await axios.get(url);
    if (response.status !== 200) {
      throw new Error("Failed to fetch user data");
    }

    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch user data");
  }
};

export const fetchData = async (url: string) => {
  try {
    const response = await axios.get(url);
    if (response.status !== 200) {
      throw new Error("Failed to fetch user data");
    }

    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch user data");
  }
};

// POST DATA WITH ACCESS TOKEN
export const fetchDelete = async (deleteEvent: string,url:string) => {
  try {
    const result = await axios.delete(
      url,
      {
        params: {
          event_id: deleteEvent,
        },
      }
    );
    const response = { status: result?.status, data: result?.data };
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { status: error.status, result: error };
    }
    console.error("Error while canceling assigned:", error);
    return { status: 500, result: error };
  }
};
