import { defer } from "react-router-dom";
import apiRequest from "./apiRequest";

export const singlePageLoader = async({request, params}) => {
    const res = await apiRequest("/posts/" + params.id);
    return { post: res.data };
}
export const listPageLoader = async({ request, params }) => {
    try {
        const query = request.url.split("?")[1];
        const postPromise = await apiRequest("/posts?" + query);
        return defer({
            postResponse: postPromise
        });
    } catch (error) {
        console.error("Failed to fetch posts:", error.message);
        throw new Response("Failed to load posts", { status: error.response?.status || 500 });
    }
};
export const profilePageLoader = async({ request, params }) => {
    try {
        const query = request.url.split("?")[1];
        const postPromise = await apiRequest("/users/profilePosts", {
            withCredentials: true, // Send cookies
        });
        return defer({
            postResponse: postPromise
        });
    } catch (error) {
        console.error("Failed to fetch posts:", error.message);
        throw new Response("Failed to load posts", { status: error.response?.status || 500 });
    }
};
