<template>
  <h2 class="text-center py-4">訂單頁面</h2>
  <table class="table mt-4 container">
    <thead>
      <tr>
        <th width="120">購買時間</th>
        <th>Email</th>
        <th width="120">購買款項</th>
        <th width="120">應付金額</th>
        <th width="100">是否付款</th>
        <th width="200">編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>2021</td>
        <td>信箱</td>
        <td class="text-right"></td>
        <td class="text-right"></td>
        <td>
          <span class="text-success">已付款</span>
        </td>
        <td>
          <div class="btn-group">
            <button class="btn btn-outline-primary btn-sm">編輯</button>
            <button class="btn btn-outline-danger btn-sm">刪除</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>
