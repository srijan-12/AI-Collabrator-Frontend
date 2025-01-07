import axios from "../config/axios"
import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"

export const Project = () =>{
    const {id} = useParams()
    const[currProject, setCurrProject] = useState(null)
    const[isSidePannelOpen, setIsSidePannelOpen] = useState(false)
    const [showModal, setShowModal] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [message, setMessage] = useState(null)
    const [projectSucess, setProjectSucess] = useState(false)
    const [Errorr, setErrorr] = useState(null)
    const handleSelectUser = (userId) => {
        if (selectedUsers.includes(userId)) {
            setSelectedUsers(selectedUsers.filter((id) => id !== userId));
            // console.log(selectedUsers)
        } else {
            setSelectedUsers([...selectedUsers, userId]);
            // console.log(selectedUsers)
        }
    };

    const handleAddUser = async()=>{
        try{
            console.log(selectedUsers)
            const result = await axios.put(`/project/add-user`, {projectId:id, newUserId:selectedUsers}, {withCredentials:true})
            if(!result?.data?.error){
                setProjectSucess(true)
                setTimeout(()=>setProjectSucess(false),1500)
            }else{
                throw new Error(result?.response?.data?.error)
            }
            setShowModal(false)
        }catch(err){
            setErrorr(err?.response?.data?.error)
            setTimeout(()=>setErrorr(false),1500)
            setShowModal(false)
        }
    }
    const blankImgSRC = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'


    useEffect(()=>{
        async function getProject() {
            const result = await axios.get(`/project/get-project/${id}`, {withCredentials:true})
            // console.log(result?.data?.project)
            setCurrProject(result?.data?.project)
        }
        async function getAllUsers() {
            const result = await axios.post(`/project/all-user`,{id}, {withCredentials:true})
            // console.log(result?.data?.allUsers)
            if(result?.data?.allUsers.length < 1){
                return setMessage('No available user')
            }
            setAllUsers(result?.data?.allUsers)
        }
        getProject()
        getAllUsers()

    },[showModal])

    return (
        <>
        {<div className="toast toast-center toast-top z-[10]">
                    {projectSucess&&<div className="alert alert-info">
                        <span>User added as a collabrator</span>
                    </div>}
                    {Errorr&&<div className="alert alert-error">
                        <span>{Errorr}</span>
                    </div>}
                </div>}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 shadow-lg w-96 max-h-[24rem] overflow-auto">
                        <h2 className="text-xl font-bold mb-4 text-center">Add Collabrators to this project</h2>

                        {!message && <div className="allusers p-4 flex flex-col gap-2">
                            {allUsers?.map((eachuser) => (
                                <div
                                    className={`singleUser border rounded-lg w-full h-fit cursor-pointer ${
                                        selectedUsers.includes(eachuser._id) ? "bg-slate-300" : ""
                                    }`}
                                    key={eachuser._id}
                                    onClick={() => handleSelectUser(eachuser._id)}
                                >
                                    <div className="userContent flex items-center p-4">
                                        <img
                                            src={`${blankImgSRC}`}
                                            alt=""
                                            className="w-10 rounded-full me-6"
                                        />
                                        <span className="font-semibold text-md">
                                            {eachuser?.email}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>}
                            {message && <div> <p>{message}</p></div>}
                        <div className="flex justify-between">
                            <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700" onClick={handleAddUser}>
                                Add collabrators
                            </button>
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}


            <main className="main h-screen w-screen">


                <section className="left h-screen w-[30%] min-w-[418px] flex flex-col relative">

                        <header className="flex justify-between p-4 w-full px-3 bg-slate-200">

                            <button className="border border-gray-300 p-2 rounded hover:bg-slate-400" onClick={()=> setShowModal(true)}>
                                    <div className="flex items-center gap-2">
                                         <i className="fa-solid fa-user-plus"></i>
                                         <small className="font-semibold">Add Collabrators</small>
                                    </div>
                            </button>

                            <button onClick={()=> setIsSidePannelOpen(!isSidePannelOpen)}>
                                <div className="border border-gray-300 p-2 rounded-full hover:bg-slate-400">
                                    <i className="fa-solid fa-user-group"></i>
                                </div>
                            </button>
                        </header>

                        <div className="messagebox flex flex-col flex-grow bg-[url('https://images.template.net/375896/Instagram-Chat-Background-edit-online-2.jpg')] bg-cover bg-center p-2">
                        
                        <div className="chat chat-start h-fit">
                            <div className="chat-image avatar">
                                <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS chat bubble component"
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                </div>
                            </div>
                            <div className="chat-header">
                                Obi-Wan Kenobi
                                <time className="text-xs opacity-50">12:45</time>
                            </div>
                            <div className="chat-bubble">You were the Chosen One!</div>
                            <div className="chat-footer opacity-50">Delivered</div>
                        </div>
                        <div className="chat chat-end h-fit">
                            <div className="chat-image avatar">
                                <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS chat bubble component"
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                </div>
                            </div>
                            <div className="chat-header">
                                Anakin
                                <time className="text-xs opacity-50">12:46</time>
                            </div>
                            <div className="chat-bubble">I hate you!</div>
                            <div className="chat-footer opacity-50">Seen at 12:46</div>
                        </div>

                        </div>
                        <div className="div flex flex-row">
                            <input type="text" name="" className='flex flex-grow border-none outline-none px-2 py-4' placeholder="Enter your message"/>
                            <button className="flex p-2 px-4 bg-[#04d68c]"><i className="fa-solid fa-circle-right text-4xl"></i></button>
                        </div>


                        <div className = {`sidePannel w-full h-full absolute bg-slate-300 transition-all ${isSidePannelOpen? 'left-0 ': 'left-[-100%]'}`}>
                            <header className="flex justify-end p-3 w-full px-3 bg-slate-200">
                                <button onClick={()=> setIsSidePannelOpen(!isSidePannelOpen)}>
                                    <div className={`border border-gray-300 p-2 rounded-full hover:bg-slate-400`}>
                                    <i className="fa-solid fa-arrow-left"></i>
                                    </div>
                                </button>
                            </header>

                            <div className="allusers p-4 flex flex-col gap-2">
                            {currProject?.collabedUsers.map((eachuser)=>{
                                return  <div className="singleUser border rounded-lg w-full h-fit cursor-pointer hover:bg-slate-400" key={eachuser._id}>
                                         <div className="userContent flex items-center p-4">
                                        <img src= {`${blankImgSRC}`} alt="" className="w-10 rounded-full me-6"/>
                                        <span className="font-semibold text-md">{eachuser?.email}</span>
                                        </div>
                                        </div>
                                    })
                                        
                                    }
                                
                            </div>
                        </div>
                </section>
            </main>
        </>
    )
}