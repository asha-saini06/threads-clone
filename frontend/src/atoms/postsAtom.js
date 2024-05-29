import { atom } from 'recoil';

const postsAtom = atom({
    key: 'postsAtom',
    default: [] // array of posts in recoil state initially empty array 
});

export default postsAtom;