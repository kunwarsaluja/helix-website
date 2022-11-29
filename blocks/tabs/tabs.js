/*
 * tabs - consonant v5.1
 * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/Tab_Role
 */
import { createTag } from '../../scripts/scripts.js';

function changeTabs(e) {
  const { target } = e;
  const parent = target.parentNode;
  const grandparent = parent.parentNode.nextElementSibling;
  parent.querySelectorAll('[aria-selected="true"]').forEach((t) => t.setAttribute('aria-selected', false));
  target.setAttribute('aria-selected', true);
  grandparent.querySelectorAll('[role="tabpanel"]').forEach((p) => p.setAttribute('hidden', true));
  grandparent.parentNode.querySelector(`#${target.getAttribute('aria-controls')}`).removeAttribute('hidden');
}

let initCount = 0;

const init = (block) => {
  block.id = `tabs-${initCount}`;
  const rows = block.querySelectorAll(':scope > div');
  let tabPos = '';

  // Create Tab Content structure
  const tabContentContainer = createTag('div', { class: 'tabcontent-container' });
  const tabContent = createTag('div', { class: 'tabcontent' }, tabContentContainer);
  block.append(tabContent);

  // Get list of Tabs from block, create tabbed container and tabs list. Convert list items to buttons 
  const tabList = rows[0];
  tabList.classList.add('tabList');
  tabList.setAttribute('role', 'tablist');
  const tabListContainer = tabList.querySelector(':scope > div');
  tabListContainer.classList.add('tablist-container');
  const tabListItems = rows[0].querySelectorAll(':scope li');
  if (tabListItems) {
    tabListItems.forEach((item, i) => {
      item[i] = `tab${i}`;
      const tabName = item[i];
      const tabBtnAttributes = {
        role: 'tab',
        class: 'heading-XS',
        id: `tab-${initCount}-${tabName}`,
        tabindex: (i > 0) ? '0' : '-1',
        'aria-selected': (i === 0) ? 'true' : 'false',
        'aria-controls': `tab-panel-${initCount}-${tabName}`,
      };
      const tabBtn = createTag('button', tabBtnAttributes);
      tabBtn.innerText = item.textContent;
      tabListContainer.append(tabBtn);
      const tabContentAttributes = {
        id: `tab-panel-${initCount}-${tabName}`,
        role: 'tabpanel',
        class: 'tabpanel',
        tabindex: '0',
        'aria-labelledby': `tab-${initCount}-${tabName}`,
      };
      const tabListContent = createTag('div', tabContentAttributes);
      tabListContent.setAttribute('aria-labelledby', `tab-${initCount}-${tabName}`);
      if (i > 0) tabListContent.setAttribute('hidden', '');
      tabContentContainer.append(tabListContent);
    });
    tabListItems[0].parentElement.remove();
  }

  // Get sections from document for tab content, inject into correct div
  Array.from(document.querySelectorAll('.section[class*=tab-')).forEach((y, i) => {
    tabPos = `tab${i}`;
    y.removeAttribute('data-section-status');
    y.remove();
    const assocTabItem = document.getElementById(`tab-panel-${initCount}-${tabPos}`);
    if (assocTabItem) assocTabItem.append(y);
  });
 
  block.querySelectorAll('[role="tab"]').forEach((tab) => {
    tab.addEventListener('click', changeTabs);
  });
};

export default function decorate (block) {
  const observer = new IntersectionObserver(async (entries) => {
    if (entries.some((entry) => entry.isIntersecting)) {
      observer.disconnect();
      init(block);
    }
  }, { threshold: 0 });
  observer.observe(block);
} ;
