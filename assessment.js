'use strict'; //厳格モードを使う(記述ミスはエラーとして表示)
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**
 * 指定した要素の子要素をすべて削除する
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element){
    while (element.firstChild){// 子要素がある限り削除
        element.removeChild(element.firstChild); 
    }
}
userNameInput.onkeydown = event =>{
    if(event.key === 'Enter'){
        assessmentButton.onclick();
    }
};
assessmentButton.onclick = () => {  //ボタンのonclickというプロパティに無名の関数を代入する(アロー関数)
    const userName = userNameInput.value;
    if (userName.length === 0){
        //名前が空の時は処理を終了する
        return; // 戻り値なしでそこで関数の処理を終了する＝ガード句
    }
    //診断結果表示エリアの作成

    removeAllChildren(resultDivided);

    const header = document.createElement('h3');　
    header.innerText = '診断結果';
    resultDivided.appendChild(header);

    const paragraph = document.createElement('p');
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);

    //TODO　Tweetエリアの作成
    removeAllChildren(tweetDivided); 
    const anchor = document.createElement('a');
    const hrefValue = 
        'https://twitter.com/intent/tweet?button_hashtag='+encodeURIComponent('あなたのいいところ')+'&ref_src=twsrc%5Etfw';

    anchor.setAttribute('href',hrefValue);
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('data-text',result);
    anchor.innerText = 'Tweet #あなたのいいところ';
    tweetDivided.appendChild(anchor);
    
    // Widget.jsの設定
    const script = document.createElement('script');
    script.setAttribute('src','http://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);
};


const answers = [
    '{userName}のいいところは声です。{userName}の明るい声は皆を惹きつけ、心に残ります。',
    '{userName}のいいところは瞳です。{userName}の柔らかな瞳は親しみやすさを感じさせます。',
    '{userName}のいいところは優しさです。{userName}の優しい気持ちは周囲の人々の心を温かくします。',
    '{userName}のいいところは勤勉さです。{userName}の真面目で真摯な態度に信頼が集まります。',
    '{userName}のいいところは自制心です。{userName}の誘惑に負けず、規律を守ろうとすることが危険を遠ざけます。',
    '{userName}のいいところは柔軟性です。{userName}の臨機応変に状況に対応するところは危機にこそ役に立ちます。',
    '{userName}のいいところは好奇心です。{userName}の新しいことに向かっていく態度が革新さを生み出します。',
    '{userName}のいいところは知識です。{userName}が積み重ねてきた努力が実践的な知識として多くの人が頼りにしています。',
    '{userName}のいいところは決断力です。{userName}のすばやい決断と決断することへの勇気が物事を前に進めます。',
    '{userName}のいいところはユニークさです。{userName}のユーモアは周囲に明るさと余裕をもたらします。',
    '{userName}のいいところは見た目です。{userName}のかわいらしさは周囲の癒しです。',
    '{userName}のいいところは情熱です。{userName}の仕事に対する熱意が成功をもたらします。',
    '{userName}のいいところは節度です。{userName}の立場をわきまえた行動は同僚や上司に安心感を与えるでしょう。',
    '{userName}のいいところは責任感です。{userName}の与えられた仕事を完遂しようとする態度に信頼が集まります。',
    '{userName}のいいところは誠実さです。{userName}の周囲に対してフェアであろうする態度は一生の宝となるでしょう。',
    '{userName}のいいところは視野の広さです。{userName}の全体を俯瞰し、最終的な目標を見失うまいとするところはチームに欠かせません。'
];
/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param{string} userName ユーザーの名前
 * @return{string} 診断結果
 */

function assessment(userName){
    //全文字のコード番号を取得してそれを足し合わせる
    let sumOfCharCode = 0;
    for (let i = 0; i<userName.length; i++){
        sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
        }
    // 文字のコード番号の合計を回答の数で割って添字の数値を求める
    const index = sumOfCharCode % answers.length;
    let result = answers[index];
    result = result.replace(/\{userName\}/g,userName); //result内の{userName}を入力されたuserNameで置き換える


return result;
}
// テストコード

console.assert(
    assessment('太郎') ===　
        '太郎のいいところは決断力です。太郎のすばやい決断と決断することへの勇気が物事を前に進めます。',
        '診断結果の特定の部分を名前に置き換える処理が正しくありません。'
);

console.assert(
    assessment('太郎') ===　assessment('太郎'),
        '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません'
);

