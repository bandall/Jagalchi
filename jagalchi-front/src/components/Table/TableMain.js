import { useEffect, useState } from "react";
import { Table, Tabs, Tab, Button } from "react-bootstrap"
import Paginationbar from "./Paginationbar";
import TableWritings from "./TableWritng";
import s from "./TableMain.module.css";
import { getPosts } from "../functions/postAPI";

function TableMain() {
    const [key, setKey] = useState('all');
    const [page, setPage] = useState(1);
    const [posts, setPosts] = useState([]);
    const [startNum, setStartNum] = useState(0);
    const [maxPage, setMaxPage] = useState(1);
    const [loggedIn, setLoggedin] = useState(false);
    
    useEffect(()=> {
        if(sessionStorage.getItem("loggedIn") === "true"){
            setLoggedin(true);
        }
        else {
            setLoggedin(false);
        }
    }, []);

    const getPost = async () => {
        const json = await getPosts(page, 10, key);
        console.log(json);
        if(json === null) {
            alert("게시글을 불러오지 못 했습니다.");
            return;
        }
        setPosts(json.data.posts);
        setMaxPage(json.data.maxPage);
        setStartNum(json.data.startNum);
    }

    useEffect(() => {
        getPost();
    }, [key, page])
    
    return (
        <div className={s.wrap_inner}>
            <a href="/" className={s.table_header}>
                <h2>자갈치 갤러리</h2>
            </a>
                <Tabs
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    id="uncontrolled-tab-example"
                    className="mb-3"
                >
                <Tab eventKey="all" title="최신순" />
                <Tab eventKey="hot" title="인기순" />
            </Tabs>
            <div className={s.wrap_table}>
                <Table hover className={s.table}>
                <thead>
                    <tr>
                        <th className={s.table_number}>번호</th>
                        <th className={s.table_title}>제목</th>
                        <th className={s.table_author}>글쓴이</th>
                        <th className={s.table_date}>작성일</th>
                        <th className={s.table_view}>조회</th>
                        <th className={s.table_suggest}>추천</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((post, index) => {
                        return (
                            <TableWritings 
                                key={index}
                                index={startNum - index}
                                title={post.title}
                                author={post.ownerName}
                                commentNum={post.commentNum}
                                date={post.createdAt.toLocaleString("kr").substring(0, 10)}
                                view={post.views}
                                recommand={post.recommand}
                                link={"post/" + post._id}
                                style={{"border-collapse":"inherit"}}
                            />
                        )
                    })}
                </tbody>
                </Table>
                <div className={s.search_bar}>
                    <div>
                        <input placeholder="검색" name="search"></input>
                        <Button variant="primary">
                            <a href="/search" style={{color: "white", textDecoration: "none"}}>검색</a>
                        </Button>{' '}
                    </div>
                    {loggedIn ? 
                    <div>
                        <Button variant="primary">
                            <a href="/post/writeboard" style={{color: "white", textDecoration: "none"}}>글쓰기</a>
                        </Button>{' '}
                    </div>
                    : null
                    }
                </div>
                <div className={s.paginationbar}>
                    <Paginationbar setPage={setPage} maxPage={maxPage} curPage={page}/>
                </div>
            </div>
        </div>
    )
}

export default TableMain;