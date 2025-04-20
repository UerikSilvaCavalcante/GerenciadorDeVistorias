import { forwardRef } from "react";


interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
    children: React.ReactNode,
    type?: "button" | "reset" | "submit";
}

const PrimaryButton = forwardRef<HTMLButtonElement, ButtonProps>(({ children, ...props }, ref) =>{
    return (
        <button ref={ref}  className="px-9 py-[5px] bg-blue-800  text-white rounded-md hover:bg-blue-600 transition-colors duration-300" {...props}>
            {children}
        </button>
    )
});
PrimaryButton.displayName = "PrimaryButton";

const SecondaryButton = forwardRef<HTMLButtonElement, ButtonProps>(({ children, ...props }, ref) =>{
    return (
        <button ref={ref}  className="px-9 py-1 bg-transparent  text-blue-800 rounded-md border-2 border-blue-800" {...props} >
            {children}
        </button>
    )
})

SecondaryButton.displayName = "SecondaryButton";

const EspecialButton = forwardRef<HTMLButtonElement, ButtonProps>(({ children, ...props }, ref) =>{
    return (
        <button ref={ref} {...props} className="flex justify-center gap-3 items-center rounded-md font-bold px-4 py-2 text-zinc-50 bg-gradient-to-r from-indigo-800 to-blue-950 hover:scale-105 transition-transform duration-500" >
            {children}
        </button>
    )
});

EspecialButton.displayName = "EspecialButton";

const EspecialSecondaryButton = forwardRef<HTMLButtonElement, ButtonProps>(({ children, ...props }, ref) =>{
    return (
        <button ref={ref} {...props} className="flex justify-center gap-3 items-center rounded-md font-bold px-4 py-2 bg-transparent hover:scale-105 transition-transform duration-500 text-transparent bg-clip-text bg-gradient-to-r from-indigo-800 to-blue-950 border-2 border-indigo-700" >
            {children}
        </button>
    )
});

EspecialSecondaryButton.displayName = "EspecialSecondaryButton";

export { PrimaryButton, SecondaryButton , EspecialButton , EspecialSecondaryButton};