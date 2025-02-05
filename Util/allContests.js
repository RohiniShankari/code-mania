module.exports=function getContests(contests){
    const contestsArr=[];
    for (let contest of contests.codechef) {
        contestsArr.push(contest);
    }
    for (let contest of contests.codeforces) {
        contestsArr.push(contest);
    }
    for (let contest of contests.leetcode) {
        contestsArr.push(contest);
    }
    for (let contest of contests.toph) {
        contestsArr.push(contest);
    }
    return contestsArr;
};