export const AddMemoButton = ({
  handler = () => {}
}: {
  handler: () => void
}) => {
  const addButtonClickHandler = () => {
    handler()
  }

  return (
    <button
      onClick={addButtonClickHandler}
      type="button"
      className="flex flex-row items-center px-4 py-2 text-sm rounded-lg transition-all border-none
      shadow-lg hover:shadow-md
      bg-green-700 hover:bg-green-300 text-slate-50 hover:text-slate-900">
      선택 메모
    </button>
  )
}
