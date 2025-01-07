import { useEffect, useState } from "react"
import axios from "../config/axios"
import { useDispatch } from "react-redux"
import { adduser } from "../store/userSlice"
import { useNavigate } from "react-router-dom"
export const Home = () =>{
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false);
    const [projectName, setProjectName] = useState("");
    const [projectSucess, setProjectSucess] = useState(false)
    const [projectArray, setProjectArray] = useState([])
    const [Errorr, setErrorr] = useState(null)
    const navigate = useNavigate()
    useEffect(()=>{
        async function getUser(){
            const getUser = await axios.get("/user/profile", {withCredentials:true})
            dispatch(adduser(getUser?.data?.result))
        }

        async function getAllUserProjects(){
            const getProjects = await axios.get("/project/all",{withCredentials:true})
            setProjectArray(getProjects?.data?.projects)
        }
        getUser()
        getAllUserProjects()
    },[showModal])
    const handleCreateProject = async() => {
        try{
            const result = await axios.post("/project/create", {name:projectName}, {withCredentials: true})
            if(result?.data?.error === null){
                setProjectSucess(true)
                setTimeout(()=> setProjectSucess(false), 1500)
            }else{
                throw new Error(result?.data?.error)
            }
        }catch(err){
            console.log(err)
            setErrorr(err?.response?.data?.error)
            setTimeout(()=> setErrorr(null), 1500)
        }
        setShowModal(false);
    };
    return (
        <>
            {<div className="toast toast-center toast-top">
                    {projectSucess&&<div className="alert alert-info">
                        <span>Project created</span>
                    </div>}
                    {Errorr&&<div className="alert alert-error">
                        <span>{Errorr}</span>
                    </div>}
                </div>}
            <div className="p-6 flex gap-2 ">
                <button
                    onClick={() => setShowModal(true)}
                    className="px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 max-h-[66px]"
                >
                    Create Project
                </button>

                <div className="project flex flex-wrap gap-2">
                        {projectArray.length>0 ? projectArray.map((pro,idx)=>{
                            return <div key={idx} className="border flex flex-col p-2 rounded min-w-[50px] hover:bg-slate-300" onClick={()=>navigate(`/project/${pro._id}`)}>
                                <span className="font-semibold">{pro.name}</span>
                                <span className="flex items-center"><small>collabs: {pro.collabedUsers.length}<i className="fa-solid fa-user ms-1"></i> </small></span>
                            </div>
                        }): null}
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 shadow-lg w-96">
                        <h2 className="text-xl font-bold mb-4 text-center">Create a New Project</h2>
                        <input
                            type="text"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                            placeholder="Enter project name"
                            className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="flex justify-between">
                            <button
                                onClick={handleCreateProject}
                                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                            >
                                Create
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
        </>
    );
}