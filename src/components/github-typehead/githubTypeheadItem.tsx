import { useState, useEffect } from 'react';
import { Image } from 'react-bootstrap';
import styles from 'styles/Typehead.module.css'

function GithubTypeheadItem({index, item, className, callback}) 
{
	const runCallback = () => {
		callback(item);
	};

	return (
		<div className={className} onClick={() => runCallback()}>
            <span className="mr-2">{index+1}.</span>
            <Image src={item.avatar_url} roundedCircle thumbnail className={`${styles.avatar} mr-2`} />
            {item.login}
        </div>
	);
}

export default GithubTypeheadItem
