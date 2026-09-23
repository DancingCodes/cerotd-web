<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-grid">
        <div class="footer-col">
          <div class="footer-brand">
            <div class="footer-brand-icon">
              <span>C</span>
            </div>
            <span class="footer-brand-text">Cerotd</span>
          </div>
          <p class="footer-desc">
            Professional lubrication technology solutions
          </p>
        </div>

        <div class="footer-col">
          <h4 class="footer-title">Products</h4>
          <ul class="footer-list">
            <li class="footer-item">
              <a href="#" class="footer-link">Industrial Lubricants</a>
            </li>
            <li class="footer-item">
              <a href="#" class="footer-link">Automotive Oils</a>
            </li>
            <li class="footer-item">
              <a href="#" class="footer-link">Specialty Greases</a>
            </li>
            <li class="footer-item">
              <a href="#" class="footer-link">Metalworking Fluids</a>
            </li>
          </ul>
        </div>

        <div class="footer-col">
          <h4 class="footer-title">Company</h4>
          <ul class="footer-list">
            <li class="footer-item">
              <NuxtLink to="/about" class="footer-link">About Us</NuxtLink>
            </li>
            <li class="footer-item">
              <a href="#" class="footer-link">R&D</a>
            </li>
            <li class="footer-item">
              <a href="#" class="footer-link">Quality</a>
            </li>
            <li class="footer-item">
              <a href="#" class="footer-link">News</a>
            </li>
          </ul>
        </div>

        <div class="footer-col">
          <h4 class="footer-title">Contact</h4>
          <ul class="footer-list">
            <li class="footer-item">Shandong, China</li>
            <li class="footer-item">info@cerotd.com</li>
            <li class="footer-item">+86 xxx xxxx xxxx</li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <p class="footer-copyright">
          &copy; {{ new Date().getFullYear() }} Cerotd (Shandong) Lubrication Technology Co., Ltd. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/mixins' as *;

.footer {
  background: $dark-bg;
  color: $white;
  padding: 48px 0;

  .footer-container {
    @include container;
  }

  .footer-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 32px;
    margin-bottom: 32px;

    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 1024px) {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  .footer-col {
    display: flex;
    flex-direction: column;

    .footer-brand {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 16px;

      .footer-brand-icon {
        width: 32px;
        height: 32px;
        background: $primary-color;
        border-radius: $border-radius-lg;
        @include flex-center;

        span {
          color: $white;
          font-weight: 700;
        }
      }

      .footer-brand-text {
        font-size: 18px;
        font-weight: 700;
      }
    }

    .footer-desc {
      color: $gray-400;
      font-size: 14px;
      line-height: 1.6;
    }

    .footer-title {
      font-weight: 600;
      margin-bottom: 16px;
    }

    .footer-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 8px;

      .footer-item {
        font-size: 14px;
        color: $gray-400;

        .footer-link {
          color: $gray-400;
          text-decoration: none;
          transition: $transition;

          &:hover {
            color: $white;
          }
        }
      }
    }
  }

  .footer-bottom {
    border-top: 1px solid $gray-800;
    padding-top: 32px;
    text-align: center;

    .footer-copyright {
      font-size: 14px;
      color: $gray-400;
    }
  }
}
</style>
