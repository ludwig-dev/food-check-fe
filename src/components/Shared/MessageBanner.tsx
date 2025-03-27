const MessageBanner = ({ message }: { message: string }) => {
    if (!message) return null;
    const isError = message.includes("❌");
    return (
        <div className={`text-sm py-2 px-4 rounded-md mb-6 mx-auto w-fit ${isError ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
            {message}
        </div>
    );
};

export default MessageBanner;
