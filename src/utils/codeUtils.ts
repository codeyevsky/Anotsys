/**
 * Verilen kod dizesinden hem tek satırlık hem de çok satırlı yorumları kaldırır.
 *
 * @param code Yorumları kaldırılacak kod dizesi.
 * @returns Yorumları kaldırılmış temiz kod dizesi.
 */
export const removeComments = (code: string): string => {
  const multilineCommentRegex = /\/\*[\s\S]*?\*\//g;
  const singlelineCommentRegex = /\/\/[^\r\n]*/g;

  let cleanedCode = code.replace(multilineCommentRegex, '');
  cleanedCode = cleanedCode.replace(singlelineCommentRegex, '');

  return cleanedCode;
};