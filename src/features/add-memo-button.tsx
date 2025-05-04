import cssText from "data-text:~style.css"

import { Input } from "~components/ui/input"
import { Label } from "~components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "~components/ui/popover"

export const AddMemoButton = ({
  handler = () => {}
}: {
  handler: () => void
}) => {
  const addButtonClickHandler = () => {
    handler()
  }

  return (
    <Popover open={true}>
      <PopoverTrigger asChild>
        <button
          // onClick={addButtonClickHandler}
          type="button"
          className="flex flex-row items-center px-4 py-2 text-sm rounded-lg transition-all border-none
      shadow-lg hover:shadow-md
      bg-green-700 hover:bg-green-300 text-slate-50 hover:text-slate-900">
          선택 메모
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 ">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">메모</Label>
              <Input
                id="width"
                defaultValue="100%"
                className="col-span-2 h-8"
              />
            </div>
          </div>
        </div>
        <div>
          <button onClick={addButtonClickHandler} type="button">
            저장
          </button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
