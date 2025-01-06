interface BoxProps {
  header: string;
  data: string;
}

export const Box = (props: BoxProps) => {
  return (
    <div className="md:pl-5 md:border-r border-gray-300 md:last:border-r-0 h-full px-2 w-full flex max-md:items-center flex-col gap-1 max-md:p-2">
      <header>
        <p className="font-semibold text-gray-400 text-xs tracking-wider">
          {props.header}
        </p>
      </header>
      <h1 className="font-semibold text-lg md:text-xl lg:text-2xl">
        {props.data}
      </h1>
    </div>
  );
};
