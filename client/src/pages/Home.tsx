import { FC } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../store/user/userSlice";

const Home: FC = () => {
    const { user, isAuth } = useSelector((state: RootState) => state.user);

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="w-[400px] h-[400px] border border-gray-300 flex flex-col items-center justify-center p-4">
                {!isAuth ? (
                    <>
                        <p className="text-center mb-4">Чтобы использовать сайт, вам нужно залогиниться</p>
                        <Link to="/auth" className="btn btn-green">Логин</Link>
                    </>
                ) : (
                    <>
                        <p className="text-center mb-4">Добрый день, {user?.name}</p>
                        <Link to="/dashboard" className="btn btn-green">Перейти к дашборду</Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Home;
