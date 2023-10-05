"use client";
import { createListAction } from "./actions";

export default function CreateList({ params }) {
  const { parentListId } = params;
  function submitHandler(data: FormData) {
    const newListData = {};
    data.forEach((d, k) => {
      newListData[k] = d;
    });
    createListAction(parentListId, newListData);
  }
  return (
    <div>
      <h1>Nueva lista</h1>
      <form action={submitHandler}>
        <label>
          <h5>Title</h5>
          <input type="text" name="title" />
        </label>
        <div>
          <input type="submit" />
        </div>
      </form>
    </div>
  );
}
