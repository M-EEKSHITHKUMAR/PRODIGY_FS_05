import * as UserApi from '../api/UserRequest';
export const updateUser=(id,formData)=>async(dispatch)=>{
    dispatch({type:"UPDATING_START"});
    try {
        const {data}=await UserApi.updateUser(id,formData);
        dispatch({type:"UPDATING_SUCCESS",data:data});
    } catch (error) {
        console.log(error);
        dispatch({type:"UPDATING_FAIL"});
    }
}

export const followuser=(id,data)=>async(dispatch)=>{
    dispatch({type:"FOLLOW_USER"})
    UserApi.followuser(id,data)


}

export const Unfollowuser=(id,data)=>async(dispatch)=>{
    dispatch({type:"UNFOLLOW_USER"})
    UserApi.Unfollowuser(id,data)
    

}