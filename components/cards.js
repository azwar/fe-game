const Card = ({ question, onClick }) => {
  return (
    <div className="mx-auto flex w-96 flex-col justify-center bg-orange-500 hover:bg-orange-700 rounded-2xl shadow-xl shadow-slate-300/60 px-0 cursor-pointer" onClick={onClick}>
      {/* <img className="flex aspect-video w-96 rounded-t-2xl object-cover object-center" src="/images/question_ilustration.jpg" /> */}

      <div className="p-4 flex bg-amber-200">
        <h1 className="text-xl font-medium text-slate-600 pb-2 font-light">{question}</h1>
      </div>
    </div>
  );
}

export default Card;