<script>
/**
 * http://codepen.io/jczimm/pen/vEBpoL
 * http://codepen.io/mrrocks/details/EiplA
 * https://material.uplabs.com/posts/material-design-spinner-inspiration
 * http://david.ingledow.co.uk/blog/google-material-designs-animated-loading-spinner-svg-and-css/
 */
import { getColor } from '@/utils';

export default {
  name: 'loader',
  props: {
    // 类型
    type: {
      type: String,
      default: 'oval',  // throb, oval, tail
    },
    // 尺寸
    size: {
      type: String,
      default: 'sm', // xs, sm, md, lg
    },
    // 颜色
    color: {
      type: String,
      default: 'blue',
    },
  },
  computed: {
    svgColor() {
      return getColor(this.color);
    },
  },
  methods: {
    /**
     * 获取 svg 内部 HTML
     * @param type
     * @returns {string}
     */
    getSvgInnerHtml(type) {
      let svgInnerHtml = '';
      switch (type) {
        case 'throb':
          svgInnerHtml = `<circle class="path" fill="none" stroke="${this.svgColor}" stroke-width="2" stroke-linecap="round" cx="19" cy="19" r="18"></circle>`;
          break;
        case 'oval':
          svgInnerHtml = `<g fill="none" fill-rule="evenodd">
                <g transform="translate(1 1)" stroke-width="2" stroke="${this.svgColor}">
                    <circle stroke-opacity="0.3" cx="18" cy="18" r="18"/>
                    <path d="M36 18c0-9.94-8.06-18-18-18">
                        <animateTransform
                            attributeName="transform"
                            type="rotate"
                            from="0 18 18"
                            to="360 18 18"
                            dur="1.2"
                            repeatCount="indefinite"/>
                    </path>
                </g>
            </g>`;
          break;
        case 'tail':
          svgInnerHtml = `<defs>
                <linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a">
                    <stop stop-color="${this.svgColor}" stop-opacity="0" offset="0%"/>
                    <stop stop-color="${this.svgColor}" stop-opacity=".631" offset="63.146%"/>
                    <stop stop-color="${this.svgColor}" offset="100%"/>
                </linearGradient>
            </defs>
            <g fill="none" fill-rule="evenodd">
                <g transform="translate(1 1)">
                    <path d="M36 18c0-9.94-8.06-18-18-18" id="Oval-2" stroke="url(#a)" stroke-width="2">
                        <animateTransform
                            attributeName="transform"
                            type="rotate"
                            from="0 18 18"
                            to="360 18 18"
                            dur="1.2s"
                            repeatCount="indefinite" />
                    </path>
                    <circle fill="${this.svgColor}" cx="36" cy="18" r="1">
                        <animateTransform
                            attributeName="transform"
                            type="rotate"
                            from="0 18 18"
                            to="360 18 18"
                            dur="1.2s"
                            repeatCount="indefinite" />
                    </circle>
                </g>
            </g>`;
          break;
        default:
      }
      return svgInnerHtml;
    },
  },
  render(createElement) {
    const svgInnerHtml = this.getSvgInnerHtml(this.type);
    const svgTypeClassName = `loader--type-${this.type}`;
    const loaderSizeClassName = `loader--size-${this.size}`;

    return createElement(
      'span',
      {
        class: ['loader', svgTypeClassName, loaderSizeClassName],
      },
      [
        createElement('svg', {
          class: 'loader__svg',
          // 正常的 HTML 特性
          attrs: {
            version: '1.1',
            xmlns: 'http://www.w3.org/2000/svg',
            width: '38',
            height: '38',
            viewBox: '0 0 38 38',
          },
          // DOM 属性
          domProps: {
            innerHTML: svgInnerHtml,
          },
        }, this.$slots.default),
      ],
    );
  },
};
</script>

<style lang="scss">
@import "../../style/import";

$loader-size-xs : px2rem(34px);
$loader-size-sm : px2rem(68px);
$loader-size-md : px2rem(102px);
$loader-size-lg : px2rem(136px);

.loader {
  display: inline-block;
  font-size: 0;
  vertical-align: middle;
  width: 1rem;
  height: 1rem;
  background-color: rgba(0,0,0,0);

  svg {
    width: 100%;
    height: 100%;
    transform-origin: 50% 50% 0;
  }

  // 尺寸
  &--size {
    &-xs {
      width: $loader-size-xs;
      height: $loader-size-xs;
    }
    &-sm {
      width: $loader-size-sm;
      height: $loader-size-sm;
    }
    &-md {
      width: $loader-size-md;
      height: $loader-size-md;
    }
    &-lg {
      width: $loader-size-lg;
      height: $loader-size-lg;
    }
  }
}
.loader--type {
  &-throb {

    svg {
      animation: rotator 1.4s linear infinite;
    }

    .path {
      stroke-dasharray: 130;
      stroke-dashoffset: 0;
      transform-origin: center;
      animation: dash 1.4s ease-in-out infinite;
    }
  }
}
@keyframes rotator {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(270deg);
  }
}
@keyframes dash {
  0% {
    stroke-dashoffset: 130;
  }
  50% {
    stroke-dashoffset: 32.5;  // 130/4
    transform: rotate(135deg);
  }
  100% {
    stroke-dashoffset: 130;
    transform: rotate(450deg);
  }
}
</style>
