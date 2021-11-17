import { useState, useEffect } from 'react';
import axios from "axios";
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { searchUser, loadMore, resetTypehead, Typehead } from '../app/reducer/typeheadSlice';
import { InputGroup, Button, FormControl, Image } from 'react-bootstrap';
import styles from '../styles/Typehead.module.css'

function Home() {
    const dispatch = useAppDispatch();
    const typehead = useAppSelector(Typehead);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadMore, setIsLoadMore] = useState(false);
    const keyword = typehead.keyword;
    const source = axios.CancelToken.source();

    useEffect(() => {
        
    }, [typehead, isLoading, isLoadMore]);


    const handleChange = (event) => {
        const value = event.target.value;

        if (!isLoading) {
            setIsLoading(true);

            dispatch(resetTypehead({}));

            dispatch(searchUser({
                keyword: value,
                page: 1,
                source: source
            })).then((action) => {
                setIsLoading(false);
            });
        }       
    }

    const handleScroll = (event: any) => {
        if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
            /**
             * Check if can load more
             */
            let loading = false;

            if (!loading) {
                loading = true;

                dispatch(loadMore({
                    keyword: typehead.keyword,
                    page: typehead.page + 1,
                    total_page: typehead.total_page,
                    source: source
                })).then((action) => {
                    loading = false;
                });
            }
        }
    }

    const displayItems = () => {
        return typehead.items.map((item: any, index: number) => 
            (
                <a key={index} href={item.html_url} target="_blank" className="list-group-item list-group-item-action flex-column align-items-start">
                    <span className="mr-2">{index+1}.</span>
                    <Image src={item.avatar_url} roundedCircle thumbnail className={`${styles.avatar} mr-2`} />
                    {item.login}
                </a>
            )
        );
    }

    return (
        <>
            <h1>Search Github</h1>

            <div className={styles.typeheadContainer}>
                <div className={styles.typeheadInputContainer}>
                    <InputGroup className="">
                        <FormControl placeholder="Github's username" value={keyword} onChange={event => handleChange(event)} />
                        <InputGroup.Append>
                            {
                                isLoading && (
                                    <div className="rbt-loader spinner-border spinner-border-sm m-2">
                                        <span className="sr-only visually-hidden">t</span>
                                    </div>
                                )
                            }
                        </InputGroup.Append>                    
                    </InputGroup>
                </div>

                {typehead.items.length >= 1 && (
                    <div className={styles.typeheadItemContainer}>
                        <div className={styles.typeheadItemSubContainer} onScroll={event => handleScroll(event)}>
                            <div className="list-group">{displayItems()}</div>
                        </div>

                        {isLoadMore && (
                            <div >
                                Loading more...
                            </div>
                        )}

                    </div>
                )}

            </div>


        </>
    )
}

export default Home