const NotFound = () => {

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted">
            <div className="text-center flex flex-col items-center justify-center">
                <img src="/ccclaymoji.svg" className="w-92 motion-preset-blur-down-lg"/>
                <h1 className="mb-4 text-5xl font-black motion-preset-blur-down-lg delay-75">404</h1>
                <p className="mb-4 text-xl text-muted-foreground motion-preset-blur-down-lg delay-100">
                    Oops! Page not found
                </p>
                <a href="/"
                   className="text-primary underline hover:text-primary/90 motion-preset-blur-down-lg delay-150">
                    Return to Home
                </a>
            </div>
        </div>
    );
};

export default NotFound;