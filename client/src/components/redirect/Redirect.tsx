import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"
import { setComment } from "../../redux/slices/commentSlice";
import { setPhoto } from "../../redux/slices/photoSlice";
import { useEffect } from "react";
import { useAppSelector } from "../../redux/typedHooks";
import { selectCurrentUser } from "../../redux/slices/currentUserSlice";
import { VscLoading } from "react-icons/vsc";
import { setUsers } from "../../redux/slices/userSlice";
import { setPost } from "../../redux/slices/postSlice";

export default function Redirect() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const currentUser = useAppSelector(selectCurrentUser);

    useEffect(() => {
        fetch("http://localhost:8000/api/users")
            .then((res) => res.json())
            .then(data => {
                dispatch(setUsers(data));
            }).then(() =>
                fetch("http://localhost:8000/api/posts")
                    .then((res) => res.json())
                    .then(data => {
                        dispatch(setPost(data));
                    })
            ).then(() =>
                fetch("http://localhost:8000/api/comments")
                    .then((res) => res.json())
                    .then(data => {
                        dispatch(setComment(data));
                    })
            ).then(() =>
                fetch("http://localhost:8000/api/photos")
                    .then((res) => res.json())
                    .then(data => {
                        dispatch(setPhoto(data));
                    })
            ).then(() => {
                navigate("/" + currentUser?.id + "/feed")
            })

    }, [dispatch, currentUser, navigate])

    return (
        <div className="w-full h-full bg-sky-600 grid place-items-center">
            <div className="text-white">
                Loading <VscLoading />
            </div>
        </div>
    )
}
