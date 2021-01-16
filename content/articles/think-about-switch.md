---
title: switch文について考える
tags: ["プログラミング"]
---

switch文は使うな、という言葉を見かけたことがある方は多いのではないでしょうか。   
switch文ではなく、ポリモーフィズムで書き換えるべきだと。 

わたしがswitch文は使わない方がいいものなんだと最初に思ったきっかけは、「リファクタリング 既存のコードを安全に改善する 新装版」を読んだときのことです。  
コードの不吉な臭いとして「スイッチ文」が取り上げられていました。

> スイッチ文は重複したコードを生み出す問題児です。[^1]

switch文を使うことで重複したコードが生み出され、新たな分岐が追加された時には全てのswitch文の条件を探して修正しないといけないからだと説明されていました。

```php
public function hoge1($type)
{
    switch($type) {
        case 1:
            .......
            break;
        case 2:
            .......
            break;
        case 3:
            .......
            break;
        default:
            break;
    }
}

public function hoge2($type)
{
    switch($type) {
        case 1:
            .......
            break;
        case 2:
            .......
            break;
        case 3:
            .......
            break;
        default:
            break;
    }
}
```

例えば上記のコードだと、$type=4の振る舞いを追加したい時にはhoge1、hoge2に分岐を追加しないといけません。  
$type=1の振る舞いを変更する必要がある時には、hoge1、hoge2どちらにも修正を加えないといけないかもしれません。  
変更しなければいけない箇所が複数に散らばっており、保守しにくいコードになっています。  
OCP[^2]に違反しています。  
このようなことが起きるので、switch文は使うべきではないと述べられていました。

ところが最近になって出版された「リファクタリング 既存のコードを安全に改善する（第2版）」では、同じく不吉なコードの臭いとしてスイッチ文が取り上げられているのですが、「重複したスイッチ文」と名前が変わっていました。

> 今後問題とするのは、重複したswitch文のみとします。  
> switch/case文や、if/else文の形でコードのさまざまな箇所に同じ条件分岐ロジックが書かれていれば、それは不吉な臭いです。[^3]

初版が出版された約15年前は、ポリモーフィズムの考え方が一般的ではなかったそうです。  
switch文しか使えないという考え方がコードの不吉な臭いであることを強調したかったので「スイッチ文」という名前にしたが、switch文そのものが悪な訳ではないよ、と第2版では説明が変わっています。

重複したswitch文に出会ったら、ポリモーフィズムに置き換えよう。  
switch文に関する考え方は、これが一番しっくりきました。

とはいえ。  
一度switch文でコードを書いてしまうと、次に機能を拡張して同じような条件分岐が必要になった場合、すでにあるswitch文を利用してコードを書いてしまう、もしくは書かれてしまうことが多いと思います。  
その方がその瞬間のタイミングではコストが少なく簡単に実装できるからです。

なので、switch文で実装が必要な場面に出会った時は、本当にswitch文でいいのか、ポリモーフィズムを適用すべきかをきちんと検討した方が良いと思います。

ちなみにたまに「switch文使うなというならelseifで書けというのか、そちらの方が分かりづらくなるじゃないか」という意見も見かけますが、  
(Martin Fowlerが言う)switch文を使わない方がいい理由が重複したコードによる変更箇所が広がることなので、elseif文に切り替えたとしても状況は変わりません。  
もしポリモーフィズムに切り替えるほどでもない条件分岐を複数作らなければいけないならば、可読性の観点から言えばswitch文を使った方がいいだろうなと思います。

[^1]: ＭａｒｔｉｎＦｏｗｌｅｒ. 新装版　リファクタリング　既存のコードを安全に改善する
[^2]: https://kanoe.dev/2020/1027-open-closed-principle/
[^3]: ＭａｒｔｉｎＦｏｗｌｅｒ. リファクタリング 既存のコードを安全に改善する（第2版）