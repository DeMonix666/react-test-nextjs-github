import GithubTypehead from 'components/github-typehead/githubTypehead';

function Home() {
    /**
     * Separated the callback to let the user decide
     */
    const gotoGithub = (item) => {
        var win = window.open(item.html_url, '_blank');
        win.focus();
    };

    return (
        <>
            <h1>Search Github</h1>

            <div className="mb-4"><GithubTypehead className="list-group-item list-group-item-action pointer" callback={(item) => gotoGithub(item)} /></div>

            <div className="">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut massa quis urna bibendum tempus viverra nec erat. Nullam eu commodo turpis. Integer sit amet eros turpis. Donec laoreet nisi urna, in finibus augue ornare eu. Quisque nibh nisl, iaculis eu congue eu, pretium vel massa. Duis scelerisque urna ac fringilla pharetra. Sed nisi diam, posuere non tincidunt in, molestie blandit sapien. Proin sit amet tempus enim.</p>

                <p>Aenean mattis posuere faucibus. Aliquam eget pulvinar leo. Maecenas tempor nibh a nisl venenatis maximus. Pellentesque risus nulla, pretium id lacinia id, pharetra at turpis. Fusce dolor leo, aliquet congue nisl id, maximus vestibulum nisl. Fusce quis purus vel felis facilisis maximus. Etiam vitae orci nisi. Praesent dignissim, dui in volutpat finibus, tortor mauris suscipit orci, vitae molestie tellus urna vitae velit. Praesent libero nisi, sagittis at est id, volutpat suscipit nunc. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed odio lacus, tempus et aliquet vel, scelerisque iaculis ipsum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>

                <p>Etiam quis turpis sed ante mattis ullamcorper. Aliquam iaculis tellus ex, at ultricies justo molestie sed. Praesent pellentesque placerat consequat. Proin lobortis et massa ut commodo. Donec scelerisque, arcu et finibus condimentum, leo enim volutpat nisl, vitae laoreet ex quam sed est. Vestibulum vel dapibus felis. Phasellus quis vulputate nisi. In massa turpis, ultrices in dictum eget, tincidunt vel eros. Donec blandit leo sed ornare convallis. Praesent consectetur lacus feugiat orci semper ultrices. Curabitur ornare diam in felis feugiat dapibus. Praesent ut quam ac nisi molestie tincidunt.</p>
            </div>
        </>
    )
}

export default Home