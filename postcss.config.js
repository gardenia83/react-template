module.exports = {
  plugins: [
    require('stylelint')({
      fix: true, // 启用自动修复
    }),
    require('autoprefixer')(),
  ],
};
