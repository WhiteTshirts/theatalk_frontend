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
- error { string } : エラーメッセージ

初期値
- id: null
- token: null
- isLoggedIn: False
- isLoading: False
- error: null

### Action

reducerに紐付いたAction

- ログイン
  - ログインリクエスト
    - isLoading = True
    - その他パラメーターは初期値に設定
  - ログインに成功した時
    - isLoggedIn = True
    - id, tokenは取得したものを設定
    - その他パラメーターは初期値に設定
  - ログインに失敗した時
    - errorは取得したものを設定
    - その他パラメーターは初期値に設定
- 新規登録
  - 新規登録リクエスト
    - isLoading = True
    - その他パラメーターは初期値に設定
  - 新規登録に成功した時
    - isLoggedIn = True
    - id, tokenは取得したものを設定
    - その他パラメーターは初期値に設定
  - 新規登録に失敗した時
    - errorは取得したものを設定
    - その他パラメーターは初期値に設定

上記のActionを組み合わせたAction

- ログイン処理
  - ログインリクエストをdispatch
  - APIを叩いて正常終了したならログインに成功した時のActionをdispatch
    - その後local storageに保存するActionをdispatch
  - 正常終了しなかった場合はログインに失敗した時のActionをdispatch
- 新規登録処理
  - 新規登録リクエストをdispatch
  - APIを叩いて正常終了したなら新規登録に成功した時のActionをdispatch
    - その後local storageに保存するActionをdispatch
  - 正常終了しなかった場合は新規登録に失敗した時のActionをdispatch
- local storageへの書き込み処理
  - local storageのActionを内部で叩く
  - SaveTokenみたいな関数をLocal Storage側のActionに用意しておく
  - それをこちら側のActionから呼び出す

## roomStore

目的: 入室している部屋の情報を管理する

### reducer

- room { Object } : ルーム
- ws { Object } : websocketのインスタンス
- chats { string[] } : chatの履歴
- isLoading { boolean } : 処理を実行しているかどうか
- error { string } : エラーメッセージ

初期値

- room: null
- ws: null
- chats: []
- isLoading: False
- error: null

### Action

reducerに紐付いたAction

- 入室処理
  - 入室リクエスト
    - isLoading = True
    - その他は初期値
  - 入室に成功した時
    - roomにはaxiosからのresponseの情報を入れる
    - その他は初期値
  - 入室に失敗した時
    - errorにはAPIを叩く時にキャッチしたエラーメッセージを入れる
    - その他は初期値
- 退室処理
  - 退室リクエスト
    - isLoading = True
    - その他は現在の状態を引き継ぐ
  - 退室に成功した時
    - 全て初期値
  - 退室に失敗した時
    - errorにはAPIを叩く時にキャッチしたエラーメッセージを入れる
    - その他は現在の状態を引き継ぐ
- チャット
  - チャットを開始する
    - wsには生成したwebsocketのインスタンスを入れる
    - その他は初期値
  - チャット送信リクエスト
    - isLoading = True
    - その他は現在の状態を引き継ぐ
  - チャット送信に成功した時
    - isLoading = False
    - その他は現在の状態を引き継ぐ
  - チャット送信に失敗した時
    - errorにはAPIを叩く時にキャッチしたエラーメッセージを入れる
    - その他は現在の状態を引き継ぐ
  - チャットを受信した時
    - chatsには現在のチャット情報に追加して新しいチャット情報を入れる
      - 参考に
      - chats: [...state.chats, action.chats]
    - その他は現在の状態を引き継ぐ
  - チャットを終了する
    - 全て初期値に設定

上記のActionを組み合わせたAction

- 入室処理
  - 入室リクエストをdispatch
  - APIを叩いて正常終了したなら入室に成功した時のActionをdispatch
    - その後local storageに保存するActionをdispatch
    - その後チャットを開始するActionをdispatch
  - 正常終了しなかった場合は入室に失敗した時のActionをdispatch
- 退室処理
  - 退室リクエストをdispatch
  - APIを叩いて正常終了したなら退室に成功した時のActionをdispatch
    - その後local storageに保存するActionをdispatch
    - その後チャットを終了するActionをdispatch
  - 正常終了しなかった場合は退室に失敗した時のActionをdispatch
- local storageへの書き込み処理
  - local storageのActionを内部で叩く
  - SaveRoomみたいな関数をLocal Storage側のActionに用意しておく
  - それをこちら側のActionから呼び出す
- チャット処理(チャットを行う)
  - チャット送信リクエストをdispatch
  - APIを叩いて正常終了したならチャット送信に成功した時のActionをdispatch
  - 正常終了しなかった場合はチャット送信に失敗した時のActionをdispatch
- チャット処理(チャットを受信する)
  - チャット受信Actionをdispatch
    - dispatch部分はwsの定義部分に書く
