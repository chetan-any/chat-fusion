/**
 * Constructs a chat URL based on two user IDs.
 *
 * @param {string} currentUserID - The ID of the current user.
 * @param {string} friendID - The ID of the friend.
 * @returns {string} The constructed chat URL.
 *
 * @example
 * chatHrefConstructor("user123", "user456"); // Returns "user123--user456"
 */

export default function chatHrefConstructor(currentUserID: string, friendID: string) {
    return `${currentUserID}--${friendID}`
}