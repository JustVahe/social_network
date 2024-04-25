import Menu from "./Menu";
import Feed from "./feed/Feed";

const MainPage = () => {
    return ( 
        <>
            <Menu />
            <div className="container">
                <Feed />
            </div>
        </>
        
     );
}
 
export default MainPage;