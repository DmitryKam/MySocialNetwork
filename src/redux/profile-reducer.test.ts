import profileReducer, {addPostAC, deletePostAC, ProfilePageType} from './profile-reducer';


let startState:ProfilePageType

beforeEach(() => {
    startState = {
        status:'Yo',
        profile:{
            aboutMe:'',
            contacts: {
                facebook:'',
                github:'',
                instagram:'',
                mainLink:'',
                twitter:'',
                vk:'',
                website:'',
                youtube:'',
            },
            photos:{
                large:'',
                small:'',
            },
            fullName:'',
            lookingForAJob: false,
            lookingForAJobDescription:'',
            userId:0
        },
        posts:[
            {id: 1, message: 'Hi, how are you?', likesCount: '4'},
            {id: 2, message: 'I learn in IT-INCUBATOR', likesCount: '10'},
        ]

    }
})


test('New post should be added',()=>{

    const endState =  profileReducer(startState,addPostAC('TestPostText'))

    expect(endState.posts[2].message).toBe('TestPostText')

})


test(' post should be incremeted',()=>{

    const endState =  profileReducer(startState,addPostAC('TestPostText'))

    expect(endState.posts.length).toBe(3)

})

test('post should be deleted',()=>{

    const endState =  profileReducer(startState,deletePostAC(2))

    expect(endState.posts.length).toBe(1)

})

test('after deleting length of message should be decrement',()=>{

    const endState =  profileReducer(startState,deletePostAC(1000))

    expect(endState.posts.length).toBe(2)

})