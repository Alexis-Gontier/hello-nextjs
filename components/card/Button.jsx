export default function Button({ color, children, onClick }) {
  return (
    <button
        className={`w-[100px] px-2 py-1 mb-2 duration-300 ${color} border-2 border-neutral-400 rounded-md hover: opacity-90 hover:border-neutral-700`}
        onClick={onClick}
    >
        {children}
    </button>
  )
}
