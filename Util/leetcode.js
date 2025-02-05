
const getLeetcodeProfile=async (username) => {
    const { LeetCode } = await import("leetcode-query");
    const leetcode = new LeetCode();
    // Now you can use LeetCode
    const user = await leetcode.user(username);
    //console.log(user.matchedUser.submitStats);
    return user;
  };
  module.exports=getLeetcodeProfile;


