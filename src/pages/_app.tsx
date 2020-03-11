import '~/assets/scss/_main.scss'

export default ({ Component, pageProps }) => (
    <>
        <div id="main-layout">
            <Component  {...pageProps} />
        </div>
        <style jsx global>{`
            * {
                box-sizing: border-box;
                margin: 0;
                padding: 0;
            }
            
            html, body {
                width: 100%;
                height: 100%;
            }
        `}</style>
    </>
)