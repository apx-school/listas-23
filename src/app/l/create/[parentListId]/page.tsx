"use client";
import { createList } from "./actions";

export default function CreateList({ params }) {
  const { parentListId } = params;
  function submitHandler(data: FormData) {
    const newListData = {};
    data.forEach((d, k) => {
      newListData[k] = d;
    });
    createList(parentListId, newListData);
  }
  return (
    <div>
      <h1>Nueva lista</h1>
      <form action={submitHandler}>
        <label>
          <h5>Nota</h5>
          <input type="text" name="note" />
        </label>
        <label>
          <h5>URL</h5>
          <input type="text" name="url" />
        </label>
        <div>
          <input type="submit" />
        </div>
      </form>
    </div>
  );
}
