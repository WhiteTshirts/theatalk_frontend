# これは何?

storeの設計を書いたもの.

正しくは現状のstoreの状況を把握してそこから新しいstoreの設計を作成する,までの一連の流れを書いたもの.

# 改修前のstoreの状態

## authStore

ログインしているかどうかを管理している.

また, ユーザーのログイン・新規登録・ログアウトなどといったActionを管理.

画面のリロードが行われた際のActionも管理.

リロード部分は考え直す必要あり.

## chatStore

チャットの情報を管理している.

チャットのopen, close, 受信, 送信といったActionを管理.

現在入室しているかどうかを管理するStoreと統合したほうが良さそう

-> 入室・退室処理が別々になってしまっているため.

## createRoomStore

ルーム作成やダイアログの情報を管理している

ルーム作成の状態は全体で保持する必要がないためstoreじゃなくてコンポーネントに状態をもたせる.

ダイアログの状態も全体で保持する必要は無さそうなのでここも削除.

## roomStore

ルームの入退室やlocal storageへの情報の書き込みを管理している

local storageへの書き込み部分は分離させても良さそう

## roomsStore

様々なルームの情報を管理している

## searchedRoomStore

検索された後のルームの情報を管理している

roomsStoreと統合すべき

## tagStore

タグの情報を管理している

## userTagStore

ユーザーに紐付いたタグの情報を管理している

これはsearchedRoomStoreと同じでtagStoreと結合したほうが良さそう.

# 改修後のstore

ここからは、現状のStoreの設計から見直して作り直した後のstoreの設計情報になります.

## storeのテンプレート

目的: このStoreで何を管理するのか

reducer: それぞれのデータの型と中身

Action: storeのデータを変更する方法について

## authStore

目的: ユーザーのログイン状態を管理する

### reducer

- id { number } : ユーザーのID
- token { string } : ユーザーのtoken
- isLoggedIn { boolean } : ユーザーがログインしているかどうか
- isLoading { boolean } : ログイン or 新規登録の処理を行っているかどうか

### Action

reducerに紐付いたAction

- ログイン
  - ログインリクエスト
  - ログインに成功した時
  - ログインに失敗した時
- 新規登録
  - 新規登録リクエスト
  - 新規登録に成功した時
  - 新規登録に失敗した時

上記のActionを組み合わせたAction

- ログイン処理
- 新規登録処理
- local storageへの書き込み処理
  - local storageのActionを内部で叩くのか
  - そもそもlocal storageのActionに丸投げするのか
  - 未定

