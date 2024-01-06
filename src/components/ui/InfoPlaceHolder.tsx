export type TInfoPlaceHolder = {
  title: string;
  text: string;
};

export default function InfoPlaceHolder({ text, title }: TInfoPlaceHolder) {
  return (
    <div className="bg-[var(--grayBG)] rounded-xl px-4 py-3 text-sm">
      <span className="opacity-70">{title}</span>
      <p>{text}</p>
    </div>
  );
}
