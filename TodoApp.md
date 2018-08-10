# TodoApp作成の手順
## 概要  
今回のチュートリアルでコンポーネントをそれぞれモジュールとして分割しておいてアプリ構築を進める方法とstateの使い方を学習できます。

編集するファイルはsrcフォルダ内のファイルです。

ファイル構成

```
src/
 index.js
 App.js
 App.css
 components/
 	AddTodo.js
 	List.js
```

renderするファイルは`index.js`です。
`App.js`はコンポーネントをまとめたファイルです。またstateの仕組みもここで構築します。

`AddTodo.js`と`List.js`はcomponentsフォルダにまとめています。

`AddTodo.js`は入力部品、`List.js`は出力するリストのコンポーネントを作成しています。

今回のTodoAppではタスク追加機能とタスク削除機能があります。  これを実現するための技術的なポイントは、stateを使ってタスクをApp.jsに持たせておくことです。そして、その値を追加する機能、そして削除する機能を付ける必要が出てきます。それはstateの変更をsetState()で行えば解決できます。

そしてこれらのstateの変更作業はstateを持っているApp.jsで行わなければならない点です。

ポイントは親になるファイルにstateを持たせておいて、子供になるコンポーネントファイルからこの値を受け取る必要があります。

どのようにして、親から子へ値を渡したり、命令を実行するかがこのチュートリアルの最大のポイントになります。

## Step1
index.jsにDOM書き出しのための`render()`を記述。

### 必要なモジュールのインポート
* 必須の`react`をインポート
* render()を使うための`react-dom`をインポート
* 各種コンポーネントをまとめた`App.js`をインポート

### render関数を記述します。
* 第1引数にタグ形式でコンポーネントの指定
* 第2引数は書き出し先のID名を記述

コードサンプル
```
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
```

## Step2 Appファイル作成
コンポーネントをまとめるファイルです。

インポート文は必須の`react`と`App.css`そして各コンポーネントを読み込みます。

インポート文のコード
```
import React, { Component } from 'react';
import './App.css';
import { AddTodo } from "./components/AddTodo";
import { List } from "./components/List";
```

各パーツをまとめるコンポーネントはClassを使って記述します。
お決まりのコンストラクターを記述（propsを忘れない事）して、その中にsuper()を記述します。
そしてもう一つの決まりごと、rendar()関数を記述します。  
render関数ではreturnしてDOMをJSXで記述していきます。  
exportしてindex.jsで読み込めるようにしておきます。

```
class App extends Component {
  constructor(props){
    super(props);
    }
  }

  render() {
    return (
      <div className="wrap">
      <h2>TodoApp</h2>
      </div>
    );
  }

export default App;
```

## Step3 AddTodo.jsとList.jsの作成
AddTodo.jsファイルは入力フォームを作るコンポーネントです。
まずはh2要素のみ表示させます。

```
import React, { Component } from 'react';

export class AddTodo extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div>
      <h2>AddTodo</h2>
      
      </div>
    );
  }
```

List.jsはリスト表示のコンポーネントです。
こちらもh2要素のみ表示させます。

```
import React, { Component } from 'react';

export class List extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div>
      <h2>List</h2>
     
      </div>
    );
  }
}
```

次にApp.jsのrender関数にAddTodoコンポーネントと ListコンポーネントをJSX形式のタグで読み込みます。

```
render() {
    return (
      <div className="wrap">
      <h2>TodoApp</h2>
      <AddTodo />
      <List />
      </div>
    );
  }
```

APP.jsとindex.jsのインポートがうまくいっていればブラウザ確認するとTodoAppに記述したh2要素「TodoApp」とAppTodoに記述したh2要素「AddTodo」そしてLinkに記述したh2要素の「List」が表示されます。

## Step4 stateを持たせる
コンポーネントをclassで作成する場合、そのコンポーネントにある一定の性質を持たせたい場合があります。これをReactではstateを持たせると呼びます。その記述は`this.state=値`のように書きます。これはつまりClassがもつプロパティになります。プロパティの名前を`state`にして状態を持たせることにしています。
そして、その状態をインスタンス後に行うにはsetter関数を使って変更します。
具体的には、`setState()`関数を使います。

今回のサンプルでは、stateはApp.jsのコンストラクターの中に持たせます。書き方は`this.state=値`とします。

この時に保持させる値は、id番号をキーにし、値はタスク名とした連想配列にします。
さらに、この値をさらに配列にしてまとめます。
キーは`todos`と`nextID`とします。  
`todos`にはidとタスクの配列が入ります。今の段階では仮の値を入れておきます。
もう一方のキー`nextID` はプログラム上必要な値です。

App.jsのstateはこのプログラムで必要な値を全て保有することになります。
ここまでの作業でstateに値を入れる器だけ作成して仮の値を入れた状態になっています。

```
constructor(props){
    super(props);
    this.state = {
      todos:[
      {id:0,title:'title0'},
      {id:1,title:'title1'},
      {id:2,title:'title2'}
      ],
      nextId:0
    }
  }
```

## Step5 stateの値をListに渡す

上記の記述でstateで値を保持しました。
ここからがポイントです。ここで保持したstateの値をこのファイル内で使用することは簡単ですが、子コンポーネントに当たるListに受け渡すにはどうしたら良いでしょうか？

その方法は実に簡単でJSX形式で記述した`<List>`タグに属性の形で記述すればいいのです。

```
  <List todos={this.state.todos}/>
```

これでListに対してstateを渡すことができます。
続いて、List側の設定ですが、Listクラスのコンストラクターにあるpropsで受け取ることができます。つまり、`const list = this.props.todos`の記述でAppのstateを変数listに受け取ることができます。

`this.state.todos`を`this.props.todos`で受け取ると考えたら良さそうです。

stateの値を単純に受け取るだけでなくmap関数を使ってliタグでstateの各値を囲むことを行います。それが次の記述です。

```
export class List extends Component {
  constructor(props){
    super(props);
  }

  render() {
  	const list = this.props.todos.map(todo =>{
  		return (
  			<li key={todo.id}>
  			#{todo.id} {todo.title}
  			</li>
  			);
  }
}

```

あとはListのreturn文で書き出しをします。
この段階でStep4で作成した仮の値が表示されるようになります。

```
return (
      <div>
      <h2>List</h2>
      <ul>{list}</ul>
      </div>
    );
```

## Step6 AddTodoのフォーム作成
今度は入力した値を表示させる手続きに入ります。

フォーム作成のポイントはsubmitボタンを押したら入力データをstateに渡す方法です。その一連の流れを押さえておく必要があります。

まず、input type="text"の値ですが、どのように取得するかですが、これはstateを使います。ただし、このstateはApp.jsで作ったstateではなく、このファイルに新規にstateを宣言してそれを使います。

つまり、AddTodoに対してもstateを与えておきます。値は`title:""`とします。

AddTodoクラスのコンストラクターにstateを宣言
```
constructor(props){
    super(props);
    this.state = { title:"" }
  }
```

そうすると`value={this.state.title}`でstateに値を保存することができます。初期値は`""`ですから、値はありません。

次にsubmitボタンをクリックしたら入力値をstateに保存する方法です。
onChangeハンドラーを使ってイベント処理をします。イベント処理は関数を作っておきます。
* `event.target.value`はinput要素のvalue値を取るものです。
* `this.setState({ title:title_value })`でこのクラスのstateに入力したタスク名を保管します。つまり1行入力ボックスで入力が終わったら、このクラスのstateに入力内容が保管されます。

イベント処理の関数
```
handleChange = event => {
    const title_value = event.target.value;
    this.setState({ title:title_value })
   }
```

入力ボックスの記述
```
<input value={this.state.title} onChange={this.handleChange} />
```

入力フォームのコード
```
render() {
    return (
      <div>
      <h2>AddTodo</h2>
      <form onSubmit={this.handleSubmit}>
		<input value={this.state.title} onChange={this.handleChange} />
		<input type="submit" value="Add to todo list" />
      </form>
      </div>
    );
  }
```
## Step7 submitしたときのstateの動き
submitボタンが押された時は、AddTodoクラスのstateに保管された入力内容をAppクラスが持つstateの値に保管する仕組みです。

submitボタンを押した時の動きですが`onSubmit`ハンドラーを使います。
具体的にはformタグに`onSubmit={this.handleSubmit}`を追加してonSubmit関数を呼び出します。
使いたいstateはApp.jsにありますので、onSubmit関数もApp.jsに記述します。

```
<form onSubmit={this.handleSubmit}>
```

イベントの関数は次のことを行います。

* `event.preventDefault()`はsubmitした時にページ遷移するのを防ぐものです。
* `this.state.title`は現在の入力値を取得できます。その値を自作のaddTodo関数で処理します。ここの詳細は次のStepで説明します。
* Submitした後に入力内容を空の状態にするのが、`this.setState({ title:"" })`です。

```
handleSubmit = event => {
  	event.preventDefault();
  	this.props.addTodo(this.state.title)
    this.setState({ title:"" })
}
```

## Step8 自作のaddTodo関数の動き
submitボタンをクリックしたら入力値をstateに受け取る作業は前Stepで行いました。今回は受け取った値をListに渡して表示する方法です。

その命令はaddTodo関数で行います。
まず、addTodo関数はApp.jsに記述していることに注目してください。

3点リーダー（...）記述でこれまでの配列に追加を行います。
`...this.state.todos`部分はこれまでのデータという意味で、`{id:this.state.nextId +1,title:title}`が新しい値を追加するということ。


```
addTodo = (title) =>{
    this.setState({todos:[...this.state.todos,{id:this.state.nextId +1,title:title}],
    nextId: this.state.nextId + 1
  })
  }
```

その結果を`<AddTodo addTodo={this.addTodo}/>`とすることでAddTodoファイルでaddTodo関数を使うことがができます。
これでAddTodoの`this.props.addTodo(this.state.title)`を実行できる。

```
handleSubmit = event => {
  	event.preventDefault();
  	this.props.addTodo(this.state.title)
    this.setState({ title:"" })
}
```

これで以下部分が必要なくなる`{id:0,title:'title0'},{id:1,title:'title1'},{id:2,title:'title2'}`ので削除する。

```
constructor(props){
    super(props);
    this.state = {
      todos:[],
      nextId:0
    }
  }
```

## Step9 削除ボタン

削除ボタンはList.jsの`render()`に追記します。

```
<li key={todo.id}>
  #{todo.id} {todo.title}
  <button onClick={()=>{
  	this.props.deleteTodo(todo.id);
  }}>
  Delete
  </button>
</li>
```

削除するdeleteTodo関数は次のようにしてApp.jsに作成します。考え方は`addTodo`と同じです。

```
  deleteTodo = id =>{
    this.setState({todos:this.state.todos.filter(todo=>{
      return todo.id !== id;
    })})
  }
```




