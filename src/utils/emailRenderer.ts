import { EmailTemplate, Block } from '../types/emailTemplate';

/**
 * Generate basic responsive HTML email markup from EmailTemplate JSON structure.
 * NOTE: This focuses on inline-styles for maximum email-client compatibility.
 */
export const generateEmailHtml = (template: EmailTemplate): string => {
  if (!template) return '<p>No content</p>';

  const rowsHtml = template.rows
    .sort((a, b) => a.order - b.order)
    .map((row) => {
      const rowBlocks: Block[] = template.blocks
        .filter((b) => b.rowId === row.id)
        .sort((a, b) => a.order - b.order);

      if (row.layout === 'single') {
        const inner = renderBlocks(rowBlocks);
        return `<tr><td style="padding:0 16px;">${inner}</td></tr>`;
      }

      // double layout
      const leftBlocks = rowBlocks.filter((b) => b.column === 0);
      const rightBlocks = rowBlocks.filter((b) => b.column === 1);
      const leftHtml = renderBlocks(leftBlocks);
      const rightHtml = renderBlocks(rightBlocks);

      return `
      <tr>
        <td style="padding:0 8px;width:50%;vertical-align:top;">${leftHtml}</td>
        <td style="padding:0 8px;width:50%;vertical-align:top;">${rightHtml}</td>
      </tr>`;
    })
    .join('\n');

  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>${template.name}</title>
  </head>
  <body style="margin:0;padding:0;background:#f6f9fc;">
    <center style="width:100%;table-layout:fixed;background:#f6f9fc;padding:24px 0;">
      <div style="max-width:600px;background:#ffffff;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="border-collapse:collapse;">
          ${rowsHtml}
        </table>
      </div>
    </center>
  </body>
</html>`;
};

// Helpers
const renderBlocks = (blocks: Block[]): string => {
  return blocks
    .map((block) => {
      switch (block.type) {
        case 'pre-header':
          return `<p style="margin:0 0 8px 0;font-size:12px;color:#666;">${escapeHtml(block.content)}</p>`;
        case 'title':
          return `<h${block.level} style="margin:0 0 12px 0;text-align:${block.alignment};">${escapeHtml(block.content)}</h${block.level}>`;
        case 'body-text':
          return `<p style="margin:0 0 12px 0;font-size:${block.formatting?.fontSize || 14}px;text-align:${block.formatting?.alignment || 'left'};line-height:1.4;">${escapeHtml(
            block.content,
          )}</p>`;
        case 'image-video':
          if (block.mediaType === 'image') {
            return `<img src="${block.url}" alt="${escapeHtml(block.alt || '')}" style="max-width:100%;height:auto;display:block;margin:0 0 12px 0;" />`;
          }
          // video not supported in most clients – fallback image
          return `<p>[Video not supported in email clients]</p>`;
        case 'table':
          return renderTableBlock(block);
        case 'footer':
          return `<p style="margin:24px 0 0 0;font-size:12px;color:#999;text-align:center;">${escapeHtml(block.content)}${
            block.includeUnsubscribe ?
            ' <a href="{{unsubscribe}}" style="color:#999;text-decoration:underline;">Unsubscribe</a>' :
            ''
          }</p>`;
        default:
          return '';
      }
    })
    .join('\n');
};

const renderTableBlock = (block: any): string => {
  const headerBg = block.style?.headerBackground || '#2579FF';
  const headerColor = block.style?.headerColor || '#FFFFFF';
  const borderColor = block.style?.borderColor || '#E2EAF0';
  const rowsHtml = block.rows
    .map((row: string[], rowIdx: number) => {
      const rowBg = block.style?.alternateRowBackground && rowIdx % 2 === 1 ? '#f5f8fa' : '#ffffff';
      return `<tr style="background:${rowBg};">${row
        .map((cell: string) => `<td style="padding:8px;border:1px solid ${borderColor};font-size:14px;">${escapeHtml(cell)}</td>`) // eslint-disable-line
        .join('')}</tr>`;
    })
    .join('');
  const headerHtml = `<tr style="background:${headerBg};color:${headerColor};">${block.headers
    .map((h: string) => `<th style="padding:8px;border:1px solid ${borderColor};text-align:left;">${escapeHtml(h)}</th>`)
    .join('')}</tr>`;
  return `<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="border-collapse:collapse;margin-bottom:12px;">${headerHtml}${rowsHtml}</table>`;
};

const escapeHtml = (str: string): string => {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};
