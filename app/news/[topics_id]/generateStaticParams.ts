// 静的サイト生成のためのパラメータを生成する関数
export async function generateStaticParams() {
    // topics_idの可能な値のリストを返す
    return [
      { topics_id: '1' },
      { topics_id: '2' },
      { topics_id: '3' },
      // 必要に応じて事前レンダリングするIDを追加
    ];
  }