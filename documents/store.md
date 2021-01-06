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
- ログアウト
  - ログアウト処理
    - token = null
    - id = null
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
  - local storageのActionを内部で叩く(引数にtokenを渡す)

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
  - local storageのActionを内部で叩く(引数にroom idを渡す)
- チャット処理(チャットを行う)
  - チャット送信リクエストをdispatch
  - APIを叩いて正常終了したならチャット送信に成功した時のActionをdispatch
  - 正常終了しなかった場合はチャット送信に失敗した時のActionをdispatch
- チャット処理(チャットを受信する)
  - チャット受信Actionをdispatch
    - dispatch部分はwsの定義部分に書く

## roomsState

目的: ルーム一覧を表示するために用いる

### reducer

- rooms { Object[] } : ルーム一覧
- isLoading { boolean } : ルーム取得などの処理を行っているかどうか
- error { string } : エラーメッセージ

初期値
- rooms: []
- isLoading: False
- error: null

### Action

reducerに紐付いたAction

- ルーム取得(全て)
  - ルーム取得リクエスト
    - isLoading = True
    - その他パラメーターは初期値に設定
  - ルーム取得に成功した時
    - roomsは取得したものを設定
    - その他パラメーターは初期値に設定
  - ルーム取得に失敗した時
    - errorは取得したものを設定
    - その他パラメーターは初期値に設定
- ルーム取得(特定のタグで検索)
  - タグを用いたルーム取得リクエスト
    - isLoading = True
    - その他パラメーターは初期値に設定
  - タグを用いたルーム取得に成功した時
    - roomsは取得したものを設定
    - その他パラメーターは初期値に設定
  - タグを用いたルーム取得に失敗した時
    - errorは取得したものを設定
    - その他パラメーターは初期値に設定
  - ルーム取得(ユーザーに紐付いたタグで検索)
    - ユーザーを用いたルーム取得リクエスト
      - isLoading = True
      - その他パラメーターは初期値に設定
    - ユーザーを用いたルーム取得に成功した時
      - roomsは取得したものを設定
      - その他パラメーターは初期値に設定
    - ユーザーを用いたルーム取得に失敗した時
      - errorは取得したものを設定
      - その他パラメーターは初期値に設定

上記のActionを組み合わせたAction

- ルーム取得処理
  - ルーム取得リクエストをdispatch
  - APIを叩いて正常終了したならルーム取得に成功した時のActionをdispatch
  - 正常終了しなかった場合はルーム取得に失敗した時のActionをdispatch
- タグを用いたルーム取得処理
  - タグを用いたルーム取得リクエストをdispatch
  - APIを叩いて正常終了したならタグを用いたルーム取得に成功した時のActionをdispatch
  - 正常終了しなかった場合はタグを用いたルーム取得に失敗した時のActionをdispatch
- ユーザーを用いたルーム取得処理
  - ユーザーを用いたルーム取得リクエストをdispatch
  - APIを叩いて正常終了したならユーザーを用いたルーム取得に成功した時のActionをdispatch
  - 正常終了しなかった場合はユーザーを用いたルーム取得に失敗した時のActionをdispatch

## tagStore

目的: タグ一覧の表示や取得などを管理

ユーザーに紐付いたタグを管理する.

// #NOTE: 新しくタグを登録する際のAPIの話
全体のタグとユーザーに紐付いたタグをどうやって管理するか
- タグ全体を取得するのはStoreでやらない(tag登録ページでのStateに持たせる)
- これだとReduxのActionからtag登録ページのStateを更新する方法が無い
- タグ全体をStoreで管理させた方がいいのかな?
- 現状タグ全体を表示する必要がない(タグ全体はタグ登録でしか用いない)
- タグ登録部分をサーバーに任せるのはどうか？
  - ユーザーに紐付いたタグを登録する際に内部的に新規にタグ登録を行うかどうかなど
  - フロントでこれを組もうとすると色々めんどくさくなる
  - サーバーでこれをやるデメリットとしては一つのエンドポイントが担当している作業が複雑になるという点
    - ユーザーとタグを紐付ける + そのタグが新しいものであればタグ登録も行う
    - タグ名を入力して、それが登録されているかどうかを判断するAPIを用意すれば解決では？
    - その案で行きます

### reducer

- tags { Object[] } : タグ一覧
- isLoading { boolean } : 処理を行っているかどうか
- error { string } : エラーメッセージ

初期値
- tags: []
- isLoading: False
- error: null

### Action

reducerに紐付いたAction

- タグ取得
  - タグ取得リクエスト
    - isLoading = True
    - その他パラメーターは初期値に設定
  - タグ取得に成功した時
    - tagsは取得したものを設定
    - その他パラメーターは初期値に設定
  - タグ取得に失敗した時
    - errorは取得したものを設定
    - その他パラメーターは初期値に設定
- タグ登録
  - タグ登録リクエスト
    - isLoading = True
    - その他パラメーターは現在の状態を引き継ぐ
  - タグ登録に成功した時
    - isLoading = False
    - その他パラメーターは現在の状態を引き継ぐ
  - タグ登録に失敗した時
    - isLoading = False
    - errorは取得したものを設定
    - その他パラメーターは現在の状態を引き継ぐ
- ユーザーとタグを紐付け登録
  - ユーザーとタグ紐付け登録リクエスト
    - isLoading = True
    - その他パラメーターは現在の状態を引き継ぐ
  - ユーザーとタグ紐付け登録に成功した時
    - isLoading = False
    - その他パラメーターは現在の状態を引き継ぐ
    - その後タグ取得Actionをdispatch
  - ユーザーとタグ紐付け登録に失敗した時
    - isLoading = False
    - errorは取得したものを設定
    - その他パラメーターは現在の状態を引き継ぐ
- 登録したいタグが既に登録されているかどうか判断する
  - 既に登録されているかどうかの判断リクエスト
    - isLoading = True
    - その他パラメーターは現在の状態を引き継ぐ
  - 既に登録されているかどうかの判断に成功した場合
    - isLoading = False
    - その他パラメーターは現在の状態を引き継ぐ
  - 既に登録されているかどうかの判断に失敗した場合
    - isLoading = False
    - errorは取得したものを設定
    - その他パラメーターは現在の状態を引き継ぐ

上記のActionを組み合わせたAction

- タグ取得処理
  - タグ取得リクエストをdispatch
  - APIを叩いて正常終了したならタグ取得に成功した時のActionをdispatch
  - 正常終了しなかった場合はタグ取得に失敗した時のActionをdispatch
- ユーザーとタグを紐付け処理
  - 登録したいタグが新規かどうかを判断リクエストをdispatch
    - APIを叩いて正常終了した場合かつそのタグが登録されていない場合
      - 新規にタグ登録リクエストをdispatch
      - APIを叩いて正常終了した場合ならタグ登録に成功したときのActionをdispatch
      - 正常終了しなかった場合はタグ登録に失敗したときのActionをdispatch
    - ユーザーとタグを紐付け登録リクエストをdispatch
    - APIを叩いて正常終了したならユーザーとタグを紐付け登録に成功した時のActionをdispatch
      - その後タグ取得処理をdispatch
    - 正常終了しなかった場合はユーザーとタグを紐付け登録に失敗した時のActionをdispatch
  - 判断リクエストに失敗した場合は判断リクエストに失敗した時のActionをdispatch

## localStorageStore

目的: localStorageへの書き込みや読み取りを管理
auth tokenや, 入室しているroomの情報などを保持する

### reducer

- storage { Object[] } : local Storageで管理しているデータ一覧
- isLoading { boolean } : 処理を行っているかどうか
- error { string } : エラーメッセージ

初期値
- storage: []
- isLoading: False
- error: null

### Action

reducerに紐付いたAction

- データ取得
  - データ取得リクエスト
    - isLoading = True
    - その他パラメーターは初期値に設定
  - データ取得に成功した時
    - storageは取得したものを設定
    - その他パラメーターは初期値に設定
  - データ取得に失敗した時
    - errorは取得したものを設定
    - その他パラメーターは初期値に設定
- データ登録
  - データ登録リクエスト
    - isLoading = True
    - その他パラメーターは現在の状態を引き継ぐ
  - データ登録に成功した時
    - isLoading = False
    - その他パラメーターは現在の状態を引き継ぐ
  - データ登録に失敗した時
    - isLoading = False
    - errorは取得したものを設定
    - その他パラメーターは現在の状態を引き継ぐ

上記のActionを組み合わせたAction

- データ取得処理
  - データ取得リクエストをdispatch
  - local storageを叩いて正常終了したならデータ取得に成功した時のActionをdispatch
  - 正常終了しなかった場合はデータ取得に失敗した時のActionをdispatch
- データ登録処理
  - データ登録リクエストをdispatch
  - local storageを叩いて正常終了したならデータ登録に成功した時のActionをdispatch
  - 正常終了しなかった場合はデータ登録に失敗した時のActionをdispatch
