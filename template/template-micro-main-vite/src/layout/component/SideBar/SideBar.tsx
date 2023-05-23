import menuInit from './SideBar.ts'
import { RouterSingleMenu, RouterMainMenu } from '@/store/menu'
export default defineComponent({
  setup() {
    const {
      permissionStore,
      //  handleClick,
      routerPush,
      openKeys,
      selectedKeys,
    } = menuInit()

    const menuTitle = (title: string) => {
      return {
        title: () => (
          <>
            <span>{title}</span>
          </>
        ),
      }
    }

    const menuItemRender = (
      menus: Array<RouterSingleMenu | RouterMainMenu>
    ): JSX.Element => {
      return (
        <>
          {menus.map((menu) => {
            return menu instanceof RouterSingleMenu ? (
              <a-menu-item
                key={menu.name}
                index={menu.name}
                onClick={() => routerPush(menu)}
              >
                {menu.title}
              </a-menu-item>
            ) : (
              <a-sub-menu
                index={menu.name}
                key={menu.name}
                v-slots={menuTitle(menu.title)}
              >
                {menuItemRender(menu.children)}
              </a-sub-menu>
            )
          })}
        </>
      )
    }

    return () => (
      <>
        <div class="side-bar">
          <a-menu
            id="dddddd"
            theme="dark"
            v-model:openKeys={openKeys.value}
            v-model:selectedKeys={selectedKeys.value}
            // style="width: 256px"
            mode="inline"
            // onClick={handleClick}
          >
            {menuItemRender(permissionStore.menus)}
          </a-menu>
        </div>
      </>
    )
  },
})
