import { useEffect, useRef } from 'preact/hooks';


function useClickOutside(onClickOutside) {
    const ref = useRef(null);

    useEffect(() => {
        const handleClick = (event) => {

            if (ref.current && !ref.current.contains(event.target)) {
                onClickOutside();
            }
        };

        document.addEventListener('pointerdown', handleClick);


        return () => document.removeEventListener('pointerdown', handleClick);
    }, [onClickOutside]);


    return ref;
}

export { useClickOutside };
