import { useState, useEffect } from 'react';
import axios from "axios";
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { searchUser, loadMore, resetTypehead, GithubTypeheadState, setTypeheadKeyword } from './githubTypeheadSlice';
import { InputGroup, Button, FormControl, Image } from 'react-bootstrap';
import styles from 'styles/Typehead.module.css'
import GithubTypeheadItem from './githubTypeheadItem';

function GithubTypehead({className, callback}) {
    const dispatch = useAppDispatch();
    const typehead = useAppSelector(GithubTypeheadState);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadMore, setIsLoadMore] = useState(false);
    const [keyword, setKeyword] = useState(typehead.keyword);
    const source = axios.CancelToken.source();

    useEffect(() => {
    }, [typehead, keyword, isLoading, isLoadMore]);


    const handleChange = (event) => {
        const value = event.target.value;

        setKeyword(value);

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

    const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
        if (event.currentTarget.clientHeight + event.currentTarget.scrollTop >= event.currentTarget.scrollHeight) {
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
                <GithubTypeheadItem key={index} index={index} item={item} className={className} callback={callback} />
            )
        );
    }

    const clearSearch = () => {
        setKeyword('');
        dispatch(setTypeheadKeyword(''));
        dispatch(resetTypehead({}));
    }

    return (
        <>
            <div className={styles.typeheadContainer}>
                <div className={styles.typeheadInputContainer}>
                    <div className="d-flex w-100 position-relative">
                        <FormControl placeholder="Github's username" value={keyword} onChange={event => handleChange(event)} className="form-control-lg" />
                    
                        {
                            isLoading ? (
                                <div className="position-absolute rbt-loader spinner-border spinner-border-md m-2" style={{ right: 0 }}>
                                    <span className="sr-only visually-hidden">t</span>
                                </div>
                            ) : (
                                <div className="position-absolute" style={{ right: 0 }}>
                                    <Button onClick={() => clearSearch()} className="btn-lg">Clear</Button>
                                </div>
                            )
                        }
                    </div>
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

export default GithubTypehead