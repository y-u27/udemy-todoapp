import { useState } from "react";
import "./index.css";

export const Todo = () => {
  const [todoText, setTodoText] = useState("");
  // useState→配列の分割代入
  // setIncompleteTodos→incompleteTodosを更新する関数
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);

  // ユーザーが入力したときに実行する
  const onChangeTodoText = (event) => setTodoText(event.target.value);

  // 追加ボタンを押したときにテキストボックスに入力された内容をincompleteTodosの配列に追加する
  // onClickAddがで配列に追加された後にテキストボックスが空になる
  const onClickAdd = () => {
    /* todoTextが空の時、何もせずにリターンする */
    if (todoText === "") return;
    // 新しい配列を生成
    // 配列に追加（結合する）→スプレッド構文を使う（...値）
    // ①今のincompleteTodosを新たらしい配列になるようスプレッド構文で設定
    // ②incompleteTodosと全く同じ配列のコピーをconstで定義したnewTodosに格納する
    // ③さらにスプレッド構文の後ろに追加したい要素（今回はtodoText）を設定する→既存の配列にくっつけることができる
    // ④最後に更新関数（setIncompleteTodos）を使ってレンダリングされる度、値を更新するように設定する
    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    // setTodoTextの内容を変えたいので更新関数を読んで空文字に設定する
    setTodoText("");
  };

  // 削除ボタン機能
  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos];
    // spliceメソッド→特定の配列の中から何番目にあるindexの要素から何個削除するというメソッド
    newTodos.splice(index, 1);
    setIncompleteTodos(newTodos);
  }

  // 完了ボタン機能
  // 完了ボタンを押した行を未完了のTODOから削除し、完了のTODOの一番下に追加する
  // 削除と追加
  const onClickComplete = (index) => {
    // 未完了のTODOから行を削除
    const newIncompleteTodos = [...incompleteTodos];
    newIncompleteTodos.splice(index, 1);

    // ↓完了のTODOに追加、既存のcompleteTodosのstateに完了ボタンが押された行の要素を追加していく
    // ①スプレッド構文を使って現状のcompleteTodosに現在のcompleteTodosをコピーする
    // ②その後ろに完了ボタンが押されたtodosを追加
    // ③スプレッド構文の後ろに追加→押された行のindexが渡っている未完了のTodoがあるため、それを設定することで完了ボタンが押された情報を取得できる
    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
    setIncompleteTodos(newIncompleteTodos);
    setCompleteTodos(newCompleteTodos);
  }

  // 戻すボタン→ボタンを押したときには押したボタンのtodoを完了のTODOからは削除、そしてそのtodo内容をで未完了のTODOの一覧の一番下に追加する
  const onClickBack = (index) => {
    // 対象の要素から削除する
    // スプレッド構文で既存の配列のコピーをnewCompleteTodosに設定する
    const newCompleteTodos = [...completeTodos];
    // newCompleteTodosの中からspliceで対象のindexから1つ削除する
    newCompleteTodos.splice(index, 1);

    // 既存のincompleteTodosにcompleteTodosの指定のindexを追加する
    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];
    setCompleteTodos(newCompleteTodos);
    setIncompleteTodos(newIncompleteTodos);
  }

  // ()で囲う理由→要素が長くなる際に値を返却できるようにする
  return (
    <>
      <div className="input-area">
        {/* inputのvalueに対してtodoTextを設定すれば入力された内容がinputのvalueに反映される */}
        <input
          placeholder="TODOを入力"
          value={todoText}
          onChange={onChangeTodoText}
        />
        <button onClick={onClickAdd}>追加</button>
      </div>
      <div className="incomplete-area">
        <p className="title">未完了のTODO</p>
        <ul>
          {/* ↓未完了のtodoの一覧をループしながら画面に表示したい */}
          {/* 特定の配列をmapでループしながら1つずつ新しい要素を返却していく */}
          {/* 引数の値は何を設定てもいい（※その処理に合わせた分かりやすい方がいいかも） */}
          {incompleteTodos.map((todo, index) => (
            // 結果として表示する
            /* key指定する理由→mapなどでループしてレンダリングした場合に何個目の要素なのかを正確に比較するために目印を付ける必要があるため */
            <li key={todo}>
              <div className="list-row">
                <p className="todo-item">{todo}</p>
                <button onClick={() => onClickComplete(index)}>完了</button>
                {/* （）でindexを囲むのは悪い実装例（※ループされてonClickDeleteを通る度関数が実行されるため）
                JSXのタグの中で{}で囲った中はJavaScriptとして解釈される */}
                <button onClick={() => onClickDelete(index)}>削除</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="complete-area">
        <p className="title">完了のTODO</p>
        <ul>
          {completeTodos.map((todo, index) => (
            <li key={todo}>
              <div className="list-row">
                <p className="todo-item">{todo}</p>
                <button onClick={() => onClickBack(index)}>戻す</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Todo;
