import { useRef } from "react";
import { MdRefresh } from "react-icons/md";

const RestartButton = ({
  onRestart: handleRestart,
}) => {
  const buttonRef = useRef(null);

  const handleClick = () => {
    buttonRef.current?.blur();
    console.log(buttonRef.current?.blur());
    handleRestart();
  };

  return (
    <button
      tabIndex={-1} // to prevent focus
      ref={buttonRef}
      className={`block rounded px-8 py-2 hover:bg-slate-700/50 absolute`}
      onClick={handleClick}
    >
      <MdRefresh className="w-6 h-6" />
    </button>
  );
};

export default RestartButton;