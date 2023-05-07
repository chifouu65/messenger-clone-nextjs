import {IconType} from "react-icons";

interface AuthSocialButtonProps {
    icon: IconType,
    onClick: () => void,
    disabled?: boolean,
}

export default function AuthSocialButton({icon: Icon, onClick, disabled}: AuthSocialButtonProps) {

    // cursor-not-allowed
    return (
        <button
            type={'button'}
            onClick={onClick}
            className={`
                inline-flex
                w-full
                justify-center
                rounded-md
                bg-white
                px-4
                py-2
                text-gray-500
                shadow-sm
                ring-1
                ring-inset
                ring-gray-300
                hover:bg-gray-50
                focus:outline-offset-0
                ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
            `
            }
        >
            <Icon
                className="h-5 w-5"
                aria-hidden="true"
            />
        </button>
    )
}
