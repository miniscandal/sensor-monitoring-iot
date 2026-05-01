import { useEffect, useRef } from 'preact/hooks';


function useClickOutside(onClickOutside) {
    const ref = useRef(null);

    useEffect(() => {
        const handleClick = (event) => {

            if (ref.current && !ref.current.contains(event.target)) {
                onClickOutside();
            }
        };

        document.addEventListener('click', handleClick);


        return () => document.removeEventListener('click', handleClick);
    }, [onClickOutside]);


    return ref;
}

export { useClickOutside };
