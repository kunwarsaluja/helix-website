function buildCtaBlock(main) {
    main.querySelectorAll(':scope > div').forEach((div) => {
      const h2 = div.querySelector(':scope > h2');
      const p = div.querySelector(':scope > p');
      if(p) {
        const a = p.querySelector('a');
        // eslint-disable-next-line no-bitwise
        if (h2 && p && a && (h2.compareDocumentPosition(p) & Node.DOCUMENT_POSITION_FOLLOWING)) {
          div.classList.add('cta');
        }
      }
    });
  }