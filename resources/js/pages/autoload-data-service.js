/* ------------------------------------------------------------------------------
 *
 *  # Fixed Columns extension for Datatables
 *
 *  Demo JS code for datatable_extension_fixed_columns.html page
 *
 * ---------------------------------------------------------------------------- */

// Setup module
// ------------------------------

const AutoloadDataService = (function () {
    var objSelect2Suggest = {
        contact: {
            // 'url': window.API_SERVICE_URL + '/crm/contacts/find',
            url: window.API_SERVICE_URL_V2 + "/crm/contacts/search",
            search_param: "keyword",
            formated: "$(_id) - $(fullname)",
            html: "$(_id) - $(fullname)<br>$(phone) - $(email) - $(birthdate)",
            id: "_id",
            query: ["type"],
            version: 2,
        },
        account: {
            url: window.API_SERVICE_URL_V2 + "/crm/accounts",
            search_param: "name",
            formated: "$(name)",
            id: "_id",
            query: [],
            version: 2,
        },
        "document-type": {
            url: window.API_SERVICE_URL_V2 + "/crm/contact-document-type",
            formated: "$(name)",
            id: "_id",
            query: ["status", "_id"],
            version: 2,
        },
        document: {
            url: window.API_SERVICE_URL_V2 + "/lms/documents",
            search_param: "name",
            formated: "$(name)",
            id: "_id",
            query: [],
            version: 2,
        },
        "document-category": {
            url: window.API_SERVICE_URL_V2 + "/lms/document-categories",
            search_param: "name",
            formated: "$(name)",
            id: "_id",
            query: ["brand_id"],
            version: 2,
        },
        campaigns: {
            url: window.API_SERVICE_URL_V2 + "/crm/campaigns/search",
            search_param: "keyword",
            formated: "$(name)",
            id: "_id",
            version: 2,
        },
        source: {
            url: window.API_SERVICE_URL_V2 + "/crm/sources",
            formated: "$(name)",
            id: "name",
            query: [],
            version: 2,
        },
        ///////////// HR /////////////
        employee: {
            url: window.API_SERVICE_URL_V2 + "/hr/employees/custom/search",
            search_param: "keyword",
            formated: "$(fullname) ($(email))",
            id: "_id",
            query: [
                "type",
                "manager_id",
                "branch_id",
                "status",
                "department_id",
                "_id",
            ],
            version: 2,
        },
        department: {
            url: window.API_SERVICE_URL_V2 + "/hr/departments",
            id: "_id",
            formated: "$(name)",
            version: 2,
        },
        "setting-categories": {
            url: window.API_SERVICE_URL_V2 + "/hr/setting/category",
            id: "_id",
            formated: "$(name)",
            query: ["type", "code"],
            version: 2,
        },
        "job-title": {
            url: window.API_SERVICE_URL_V2 + "/hr/setting/job_title",
            formated: "$(name)",
            id: "_id",
            version: 2,
        },
        "hr-documents": {
            url: window.API_SERVICE_URL_V2 + "/hr/documents",
            search_param: "name",
            formated: "$(name)",
            id: "_id",
            query: ["name", "category", "type", "relate_type", "relate_id"],
            version: 2,
        },
        "recruit-jobs": {
            url: window.API_SERVICE_URL + "/hr/recruit-jobs",
            formated: "$(title)",
            id: "job_id",
            query: ["status"],
        },
        "recruit-candidates": {
            url: window.API_SERVICE_URL + "/hr/recruit-candidates",
            formated: "$(name)",
            id: "candidate_id",
            query: ["status"],
        },
        position: {
            url: window.API_SERVICE_URL_V2 + "/hr/positions",
            formated: "$(name)",
            id: "_id",
            query: ["status"],
            version: 2,
        },
        allowance: {
            url: window.API_SERVICE_URL_V2 + "/hr/allowances",
            formated: "$(name)",
            id: "_id",
            query: ["_id", "status", "department_id", "job_title_id"],
            version: 2,
        },
        hr_setting_shifts: {
            url: window.API_SERVICE_URL_V2 + "/hr/setting-shifts",
            formated: "$(name)",
            query: ["type"],
            id: "_id",
            version: 2,
        },
        /////////////// ORG ////////////////
        branch: {
            url: window.API_SERVICE_URL_V2 + "/org/branch",
            //'search_param': 'name',
            formated: "$(name)",
            id: "_id",
            query: ["brand_id", "city_code", "_id"],
            version: 2,
        },
        brand: {
            url: window.API_SERVICE_URL_V2 + "/org/brand",
            //'search_param': 'name',
            formated: "$(name)",
            id: "_id",
            query: ["status", "_id"],
            version: 2,
        },
        "sys-city": {
            url: window.API_SERVICE_URL_V2 + "/org/city",
            formated: "$(name)",
            id: "_id",
            version: 2,
        },
        city: {
            url: window.API_SERVICE_URL + "/org/location-cities",
            formated: "$(name)",
            id: "city_id",
        },
        district: {
            url: window.API_SERVICE_URL + "/org/location/district",
            formated: "$(name)",
            query: ["city_id"], // query bat buoc
            id: "district_id",
        },
        commune: {
            url: window.API_SERVICE_URL + "/org/location/commune",
            formated: "$(name)",
            query: ["district_id"], // query bat buoc
            id: "commune_id",
        },
        //////////// EDU ////////////
        "course-level": {
            url: window.API_SERVICE_URL_V2 + "/lms/course-levels",
            formated: "$(name)",
            query: ["brand_id"], // query ko bat buoc
            id: "_id",
            version: 2,
        },
        edu_reasons: {
            url: window.API_SERVICE_URL_V2 + "/lms/reasons",
            formated: "$(name)",
            query: ["type", "status"], // query ko bat buoc
            id: "_id",
            version: 2,
        },
        "course-price": {
            url: window.API_SERVICE_URL_V2 + "/lms/course-price",
            formated: "$(name)",
            query: ["course_id", "type"], // query ko bat buoc
            id: "_id",
            version: 2,
        },
        edu_setting_shifts: {
            url: window.API_SERVICE_URL_V2 + "/lms/setting-shifts",
            formated: "$(name)",
            query: ["brand_id"], // query bat buoc
            id: "_id",
            version: 2,
        },
        edu_setting_reviews: {
            url: window.API_SERVICE_URL_V2 + "/lms/setting-reviews",
            formated: "$(name)",
            query: ["brand_id"], // query bat buoc
            id: "_id",
            version: 2,
        },
        edu_category_album: {
            url: window.API_SERVICE_URL_V2 + "/lms/cate_album",
            formated: "$(title)",
            query: ["class_id"],
            id: "_id",
            version: 2,
        },
        "class-schedule": {
            url: window.API_SERVICE_URL_V2 + "/lms/class-schedules",
            formated: "$(lesson_name) Buổi $(schedule_number) Ngày $(date)",
            query: [
                "class_id",
                "is_completed",
                "review_classification",
                "test_classification",
            ],
            id: "schedule_number",
            version: 2,
        },
        test: {
            url: window.API_SERVICE_URL_V2 + "/tests/tests",
            search_param: "title",
            formated: "$(title)",
            id: "_id",
            query: [],
            version: 2,
        },
        course: {
            url: window.API_SERVICE_URL_V2 + "/lms/courses",
            //'search_param': 'name',
            formated: "$(name)",
            id: "_id",
            query: ["brand_id", "contact_id", "status", "course_level_id"],
            version: 2,
        },
        "course-search": {
            url: window.API_SERVICE_URL_V2 + "/lms/courses/search",
            search_param: "keyword",
            formated: "$(name)",
            id: "_id",
            version: 2,
        },
        "course-prices": {
            url: window.API_SERVICE_URL_V2 + "/lms/course-prices",
            //'search_param': 'name',
            formated: "$(name)",
            id: "_id",
            query: ["course_id", "from_date", "to_date", "status", "type"],
            version: 2,
        },
        "course-unit": {
            url: window.API_SERVICE_URL_V2 + "/lms/course-unit-prices",
            //'search_param': 'name',
            formated: "$(name)",
            id: "_id",
            query: ["course_id"],
            version: 2,
        },
        classes: {
            url: window.API_SERVICE_URL_V2 + "/lms/classes",
            formated: "$(name) $(start_date)",
            query: [
                "branch_id",
                "course_id",
                "lt_end_date",
                "schedule_number_available",
            ],
            id: "_id",
            version: 2,
        },
        "classes-search": {
            url: window.API_SERVICE_URL_V2 + "/lms/classes/custom/search",
            search_param: "keyword",
            formated: "$(name) - $(start_date)",
            // 'query': ['branch_id','course_id','lt_end_date','schedule_number_available'],
            id: "_id",
            version: 2,
        },
        "cost-level": {
            url: window.API_SERVICE_URL_V2 + "/lms/cost-levels",
            formated: "$(name) - $(type)",
            id: "_id",
            query: ["type"],
            version: 2,
        },
        "class-rooms": {
            url: window.API_SERVICE_URL_V2 + "/lms/classroom",
            formated: "$(name)",
            id: "_id",
            query: ["branch_id"],
            version: 2,
        },
        //practices
        practices: {
            url: window.API_SERVICE_URL_V2 + "/lms/practices/search",
            search_param: "keyword",
            formated: "$(name)",
            id: "_id",
            version: 2,
        },
        "practices-template": {
            url: window.API_SERVICE_URL_V2 + "/lms/practices-template",
            formated: "$(name)",
            id: "_id",
            version: 2,
        },
        finance_invoices: {
            url: window.API_SERVICE_URL_V2 + "/finance/invoices",
            formated: "$(_id) ($(total_amt))",
            id: "_id",
            query: [
                "contact_id",
                "brand_id",
                "sales.sale_id",
                "payment_contact_id",
            ],
            version: 2,
        },
        finance_wallets: {
            url: window.API_SERVICE_URL_V2 + "/finance/wallets",
            formated: "$(name) - $(code)",
            id: "_id",
            query: ["relate_type", "relate_id", "type"],
            version: 2,
        },
        finance_transaction_type: {
            url: window.API_SERVICE_URL_V2 + "/finance/transaction-type",
            formated: "$(name)",
            id: "_id",
            query: ["type", "status"],
            version: 2,
        },
        finance_vouchers_category: {
            url: window.API_SERVICE_URL_V2 + "/finance/vouchers-category",
            formated: "$(name)",
            id: "_id",
            query: ["name"],
            version: 2,
        },
        finance_vouchers: {
            url: window.API_SERVICE_URL_V2 + "/finance/vouchers",
            formated: "$(name)",
            id: "_id",
            query: ["category_id", "name"],
            version: 2,
        },
        ticket_topic: {
            url: window.API_SERVICE_URL + "/pm/ticket-topics",
            formated: "$(name)",
            id: "topic_id",
            query: ["department_id", "status"],
        },
        ticket_object: {
            url: window.API_SERVICE_URL + "/pm/ticket-objects",
            formated: "$(name)",
            id: "object_id",
            query: ["name", "status"],
        },
        store: {
            url: window.API_SERVICE_URL + "/inventory/stores",
            id: "store_id",
            formated: "$(name)",
        },
        ///////////// Inventory /////////////
        product: {
            url: window.API_SERVICE_URL + "/inventory/products/custom/search",
            search_param: "keyword",
            formated: "$(name)",
            id: "product_id",
            query: ["name", "product_id"],
        },

        "inventory-products": {
            url: window.API_SERVICE_URL_V2 + "/inventory/products",
            formated: "$(name)",
            search_param: "name",
            id: "_id",
            query: ["name", "store_id"],
            version: 2,
        },

        "products-to-inventory": {
            url: window.API_SERVICE_URL_V2 + "/inventory/inventory-products",
            formated: "$(name)",
            search_param: "name",
            id: "_id",
            query: ["name", "store_id"],
            version: 2,
        },

        "inventory-stores": {
            url: window.API_SERVICE_URL_V2 + "/inventory/stores",
            formated: "$(name)",
            search_param: "name",
            id: "_id",
            query: ["name", "status", "_id", "relate_id"],
            version: 2,
        },

        "inventory-category": {
            url: window.API_SERVICE_URL_V2 + "/inventory/category",
            formated: "$(name)",
            id: "_id",
            query: ["name", "parent_id", "status"],
            version: 2,
        },
        "inventory-brand": {
            url: window.API_SERVICE_URL_V2 + "/inventory/product_brand",
            formated: "$(name)",
            id: "_id",
            query: ["name", "status"],
            version: 2,
        },

        "inventory-supplier": {
            url: window.API_SERVICE_URL_V2 + "/inventory/supplier",
            formated: "$(name)",
            id: "_id",
            query: ["name", "status"],
            version: 2,
        },

        "inventory-order-group": {
            url: window.API_SERVICE_URL_V2 + "/inventory/order_group",
            formated: "$(name)",
            id: "_id",
            query: ["name", "status", "city", "_id"],
            version: 2,
        },

        "inventory-products-shipment": {
            url: window.API_SERVICE_URL_V2 + "/inventory/products_shipment",
            formated: "$(name)",
            // search_param: "name",
            id: "_id",
            query: ["name", "product_id", "status"],
            version: 2,
        },
        
        "inventory-follows": {
            url: window.API_SERVICE_URL_V2 + "/inventory/follows",
            formated: "$(name)",
            // search_param: "name",
            id: "_id",
            query: ["name"],
            version: 2,
        },

        "inventory-follows-details": {
            url: window.API_SERVICE_URL_V2 + "/inventory/follow_details",
            formated: "$(name)",
            // search_param: "name",
            id: "_id",
            query: ["name", "follow_id"],
            version: 2,
        },

        "inventory-policy": {
            url: window.API_SERVICE_URL_V2 + "/inventory/policys",
            formated: "$(title)",
            // search_param: "name",
            id: "_id",
            query: ["title", "parent_id"],
            version: 2,
        },
        ///////////// SUPPORT /////////////
        "support-flow": {
            url: window.API_SERVICE_URL_V2 + "/support/flow",
            formated: "$(name)",
            search_param: "name",
            id: "_id",
            query: ["name", "status"],
            version: 2,
        },
        ////////////NOTIFICATION/////////////
        "notification-template": {
            url: window.API_SERVICE_URL_V2 + "/notification/template",
            formated: "$(name)",
            id: "_id",
            query: ["name", "brand_id", "noti-type", "status"],
            version: 2,
        },
        ///////////CALL CENTER/////////////////////
        callcenter_ticket_topic: {
            url: window.API_SERVICE_URL_V2 + "/call-center/ticket-topics",
            formated: "$(name)",
            id: "_id",
            query: ["category_id", "status"],
            version: 2,
        },

        "core-service": {
            url: window.API_SERVICE_URL_V2 + "/core/services",
            formated: "$(name)",
            id: "_id",
            query: ["name"],
            version: 2,
        },
        "core-event": {
            url: window.API_SERVICE_URL_V2 + "/core/events",
            formated: "$(name)",
            id: "_id",
            query: ["name", "service_code", "service_id"],
            version: 2,
        },
        "core-listener": {
            url: window.API_SERVICE_URL_V2 + "/core/listeners",
            formated: "$(name)",
            id: "_id",
            query: ["name", "service_code", "service_id"],
            version: 2,
        },

        //////////Task backend v2//////////
        project: {
            url: window.API_SERVICE_URL_V2 + "/task/projects",
            formated: "$(name)",
            id: "_id",
            query: ["category_id", "status"],
            version: 2,
        },
        "task-category": {
            url: window.API_SERVICE_URL_V2 + "/task/category",
            formated: "$(name)",
            id: "_id",
            query: ["status"],
            version: 2,
        },
        /////////End task backend v2//////
    };
    var arrDomAutoFill = [
        {
            url: window.API_SERVICE_URL_V2 + "/hr/employees",
            dom: ".em-profile",
            attr: "data-id",
            pquery: "_id",
            formated: "$(last_name) $(first_name)",
            link: "/hr/employee/profile/$(_id)",
            query: ["type", "branch_id", "manager_id", "department_id"],
            fk: "_id",
            version: 2,
        },
        {
            url: window.API_SERVICE_URL_V2 + "/org/brand",
            dom: ".em-brand",
            attr: "data-id",
            formated: "$(name)",
            query: ["_id", "status"],
            fk: "_id",
            version: 2,
        },
        ////////////// EDU //////////
        {
            url: window.API_SERVICE_URL_V2 + "/tests/tests",
            dom: ".em-test",
            attr: "data-id",
            formated: "$(title)",
            query: ["title"],
            fk: "_id",
            version: 2,
        },
        {
            url: window.API_SERVICE_URL_V2 + "/lms/reasons",
            dom: ".em-reason",
            attr: "data-id",
            formated: "$(name)",
            query: ["type", "status"],
            fk: "_id",
            version: 2,
        },
        {
            url: window.API_SERVICE_URL_V2 + "/lms/courses",
            dom: ".em-course",
            attr: "data-id",
            formated: "$(name)",
            query: ["brand_id", "contact_id", "status", "course_level_id"], // query ko bat buoc
            fk: "_id",
            version: 2,
        },
        {
            url: window.API_SERVICE_URL_V2 + "/lms/course-levels",
            dom: ".em-course-level",
            attr: "data-id",
            formated: "$(name)",
            query: ["brand_id"], // query ko bat buoc
            fk: "_id",
            version: 2,
        },
        {
            url: window.API_SERVICE_URL_V2 + "/lms/course-price",
            dom: ".em-course-price",
            attr: "data-id",
            formated: "$(name)",
            query: ["course_id", "type"], // query ko bat buoc
            fk: "_id",
            version: 2,
        },
        {
            url: window.API_SERVICE_URL_V2 + "/lms/cost-levels",
            dom: ".em-cost-level",
            attr: "data-id",
            formated: "$(name)",
            query: ["type"], // query ko bat buoc
            fk: "_id",
            version: 2,
        },
        {
            url: window.API_SERVICE_URL_V2 + "/lms/classroom",
            dom: ".em-class-room",
            attr: "data-id",
            formated: "$(name)",
            query: ["branch_id"],
            fk: "_id",
            version: 2,
        },
        {
            url: window.API_SERVICE_URL_V2 + "/lms/classes",
            dom: ".em-class",
            pquery: "class_id",
            attr: "data-id",
            formated: "$(name)",
            link: "/lms/edu/class/$(_id)",
            query: [
                "branch_id",
                "course_id",
                "lt_end_date",
                "schedule_number_available",
            ],
            fk: "_id",
            version: 2,
        },
        {
            url: window.API_SERVICE_URL_V2 + "/lms/setting-shifts",
            dom: ".em-edu-shift",
            attr: "data-id",
            formated: "$(name)",
            query: ["brand_id"],
            fk: "_id",
            version: 2,
        },
        {
            url: window.API_SERVICE_URL_V2 + "/lms/setting-reviews",
            dom: ".em-setting-review",
            attr: "data-id",
            formated: "$(name)",
            query: ["brand_id"],
            fk: "_id",
            version: 2,
        },
        {
            url: window.API_SERVICE_URL_V2 + "/lms/practices",
            dom: ".em-practices",
            attr: "data-id",
            formated: "$(name)",
            fk: "_id",
            version: 2,
        },
        {
            url: window.API_SERVICE_URL_V2 + "/lms/practices-template",
            dom: ".em-practices-template",
            attr: "data-id",
            formated: "$(name)",
            fk: "_id",
            version: 2,
        },
        {
            url: window.API_SERVICE_URL_V2 + "/lms/cate_album",
            dom: ".em-category-album",
            attr: "data-id",
            formated: "$(title)",
            fk: "_id",
            version: 2,
        },
        {
            url: window.API_SERVICE_URL_V2 + "/lms/document-categories",
            dom: ".em-lms-document-category",
            attr: "data-id",
            formated: "$(name)",
            query: ["brand_id"],
            fk: "_id",
            version: 2,
        },
        {
            url: window.API_SERVICE_URL_V2 + "/hr/setting/shifts",
            dom: ".em-hr-shift",
            attr: "data-id",
            formated: "$(name)",
            query: ["_id"],
            fk: "_id",
            version: 2,
        },
        {
            url: window.API_SERVICE_URL_V2 + "/hr/employee_salary",
            dom: ".em-hr-salary",
            attr: "data-id",
            formated: "$(name)",
            query: ["_id"],
            fk: "_id",
            version: 2,
        },
        {
            url: window.API_SERVICE_URL_V2 + "/hr/positions",
            dom: ".em-position",
            attr: "data-id",
            formated: "$(name)",
            query: ["_id"],
            fk: "_id",
            version: 2,
        },
        {
            url: window.API_SERVICE_URL_V2 + "/hr/allowances",
            dom: ".em-allowance",
            attr: "data-id",
            formated: "$(name)",
            query: ["_id", "status", "department_id", "job_title_id"],
            fk: "_id",
            version: 2,
        },
        // {
        // 	'url': window.API_SERVICE_URL + '/edu/documents',
        // 	'dom': '.em-document',
        // 	'attr': 'data-id',
        // 	'formated': '$(name)',
        // 	'query': ['name'],
        // 	'fk': 'document_id'
        // },
        // {
        // 	'url': window.API_SERVICE_URL + '/edu/teacher/lists',
        // 	'dom': '.em-teacher',
        // 	'attr': 'data-id',
        // 	'formated': '$(email)',
        // 	'fk': 'employee_id'
        // },
        // {
        // 	'url': window.API_SERVICE_URL + '/lms/class-schedules',
        // 	'dom': '.em-class-schedule',
        // 	'attr': 'data-id',
        // 	'formated': '$(lesson_name) - $(schedule_number)',
        // 	'query': ['class_id','is_completed', 'schedule_from'],
        // 	'fk': 'schedule_number',
        // 	'version': 2,
        // },
        // {
        // 	'url': window.API_SERVICE_URL + '/lms/classroom',
        // 	'dom': '.em-class-room',
        // 	'attr': 'data-id',
        // 	'formated': '$(name)',
        // 	'query': ['branch_id'],
        // 	'fk': '_id',
        // 	'version': 2,
        // },
        // {
        // 	'url': window.API_SERVICE_URL + '/lms/setting-shifts',
        // 	'dom': '.em-edu-shift',
        // 	'attr': 'data-id',
        // 	'formated': '$(name)',
        // 	'query': ['brand_id'],
        // 	'fk': '_id',
        // 	'version': 2,
        // },
        // {
        // 	'url': window.API_SERVICE_URL + '/lms/courses',
        // 	'dom': '.em-course',
        // 	'attr': 'data-id',
        // 	'formated': '$(name)',
        // 	'query': ['brand_id','contact_id','status','course_level_id'], // query ko bat buoc
        // 	'fk': '_id',
        // 	'version': 2,
        // },
        // {
        // 	'url': window.API_SERVICE_URL + '/lms/course-levels',
        // 	'dom': '.em-course-level',
        // 	'attr': 'data-id',
        // 	'formated': '$(name)',
        // 	'query': ['brand_id'], // query ko bat buoc
        // 	'fk': '_id',
        // 	'version': 2,
        // },
        // {
        // 	'url': window.API_SERVICE_URL + '/lms/cost-levels',
        // 	'dom': '.em-cost-level',
        // 	'attr': 'data-id',
        // 	'formated': '$(name)',
        // 	'query': ['type'], // query ko bat buoc
        // 	'fk': '_id',
        // 	'version': 2,
        // },
        //////// END EDU /////
        {
            url: window.API_SERVICE_URL_V2 + "/org/branch",
            dom: ".em-branch",
            attr: "data-id",
            formated: "$(name)",
            query: ["brand_id", "city_code"],
            fk: "_id",
            version: 2,
        },
        {
            url: window.API_SERVICE_URL_V2 + "/org/city",
            dom: ".em-sys-city",
            attr: "data-id",
            formated: "$(name)",
            fk: "_id",
            version: 2,
        },
        {
            url: window.API_SERVICE_URL + "/org/location-cities",
            dom: ".em-city",
            attr: "data-id",
            formated: "$(name)",
            fk: "city_id",
        },
        {
            url: window.API_SERVICE_URL + "/org/location/district",
            dom: ".em-district",
            attr: "data-id",
            formated: "$(name)",
            pquery: ["city_id"], // query bat buoc
            fk: "district_id",
        },
        {
            url: window.API_SERVICE_URL + "/org/location/commune",
            dom: ".em-commune",
            attr: "data-id",
            formated: "$(name)",
            query: ["district_id"], // query bat buoc
            fk: "commune_id",
        },
        {
            url: window.API_SERVICE_URL_V2 + "/hr/departments",
            dom: ".em-department",
            attr: "data-id",
            formated: "$(name)",
            fk: "_id",
            version: 2,
        },
        {
            url: window.API_SERVICE_URL_V2 + "/hr/setting/category",
            dom: ".em-document-categories",
            attr: "data-id",
            formated: "$(name)",
            fk: "_id",
            version: 2,
        },
        {
            url: window.API_SERVICE_URL_V2 + "/hr/setting/job_title",
            dom: ".em-job-title",
            attr: "data-id",
            formated: "$(name)",
            fk: "_id",
            version: 2,
        },
        {
            url: window.API_SERVICE_URL_V2 + "/hr/documents",
            dom: ".em-hr-documents",
            attr: "data-id",
            formated: "$(name)",
            query: ["name", "category", "type", "relate_type", "relate_id"],
            fk: "_id",
            version: 2,
        },
        {
            url: window.API_SERVICE_URL_V2 + "/hr/employee-document-categories",
            dom: ".em-hr-document-categories",
            attr: "data-id",
            formated: "$(name)",
            query: ["type"],
            fk: "_id",
            version: 2,
        },
        {
            url: window.API_SERVICE_URL + "/hr/recruit-jobs",
            dom: ".em-job",
            attr: "data-id",
            formated: "$(title)",
            query: ["status"],
            fk: "job_id",
        },
        {
            url: window.API_SERVICE_URL + "/hr/recruit-candidates",
            dom: ".em-candidate",
            attr: "data-id",
            formated: "$(name)",
            query: ["status"],
            fk: "candidate_id",
        },

        {
            url: "/setting/role?json=1",
            dom: ".em-role",
            attr: "data-id",
            formated: "$(role_name)",
            fk: "role_id",
        },
        {
            url: window.API_SERVICE_URL_V2 + "/crm/campaigns",
            dom: ".em-crm-campaigns",
            attr: "data-id",
            formated: "$(name)",
            fk: "_id",
            version: 2,
        },
        {
            url: window.API_SERVICE_URL_V2 + "/crm/contact-document-type",
            dom: ".crm-document-type",
            attr: "data-id",
            formated: "$(name)",
            fk: "_id",
            version: 2,
        },
        {
            url: window.API_SERVICE_URL_V2 + "/crm/contacts",
            dom: ".crm-contact",
            attr: "data-id",
            formated: "$(fullname)",
            link: "/crm/contacts/$(_id)",
            fk: "_id",
            pquery: "_id",
            version: 2,
        },
        {
            url: window.API_SERVICE_URL_V2 + "/crm/accounts",
            dom: ".crm-account",
            attr: "data-id",
            formated: "$(name)",
            link: "/crm/accounts/$(_id)",
            fk: "_id",
            pquery: "_id",
            version: 2,
        },
        {
            url: window.API_SERVICE_URL_V2 + "/crm/sources",
            dom: ".crm-source",
            attr: "data-id",
            formated: "$(name)",
            fk: "name",
            version: 2,
        },
        {
            url: window.API_SERVICE_URL_V2 + "/crm/demands",
            dom: ".crm-contact-demand",
            attr: "data-id",
            formated: "$(name)",
            fk: "_id",
            version: 2,
        },
        {
            url: window.API_SERVICE_URL + "/inner-training/courses",
            dom: ".em-inner-course",
            attr: "data-id",
            formated: "$(name) (áp dụng từ: $(from_date))",
            query: ["brand_id", "contact_id", "status"], // query ko bat buoc
            fk: "course_id",
        },
        {
            url: window.API_SERVICE_URL + "/inner-training/classes",
            dom: ".em-inner-class",
            pquery: "class_id",
            attr: "data-id",
            formated: "$(name)",
            query: ["course_id", "lt_end_date", "schedule_number_available"],
            fk: "class_id",
        },
        {
            url: window.API_SERVICE_URL + "/inner-training/course-categories",
            dom: ".em-course-categories",
            attr: "data-id",
            formated: "$(name)",
            // 'query': ['brand_id','contact_id','status'], // query ko bat buoc
            fk: "category_id",
        },
        {
            url: window.API_SERVICE_URL + "/payroll/formulas",
            dom: ".em-formula",
            attr: "data-id",
            formated: "$(name)",
            query: ["formula_id"],
            fk: "formula_id",
        },
        {
            url: window.API_SERVICE_URL + "/payroll/templates",
            dom: ".em-template",
            attr: "data-id",
            formated: "$(name)",
            query: ["template_id"],
            fk: "template_id",
        },
        {
            url: window.API_SERVICE_URL + "/payroll/modules",
            dom: ".em-module",
            attr: "data-id",
            formated: "$(module_name)",
            query: ["module_id"],
            fk: "module_id",
        },
        {
            url: window.API_SERVICE_URL + "/pm/ticket-objects",
            dom: ".em-ticket-object",
            attr: "data-id",
            formated: "$(name)",
            fk: "object_id",
        },
        {
            url: window.API_SERVICE_URL + "/inventory/stores",
            dom: ".em-store",
            attr: "data-id",
            formated: "$(name)",
            fk: "store_id",
        },
        {
            url: window.API_SERVICE_URL + "/inventory/products",
            dom: ".em-product",
            attr: "data-id",
            pquery: "product_id",
            formated: "$(name)",
            link: "/inventory/product/$(product_id)",
            query: ["product_id"],
            fk: "product_id",
        },
        {
            url: window.API_SERVICE_URL_V2 + "/inventory/policys",
            dom: ".em-inventory-policy",
            attr: "data-id",
            formated: "$(title)",
            query: ["_id"],
            fk: "_id",
            version: 2,
        },
        {
            url: window.API_SERVICE_URL_V2 + "/inventory/follows",
            dom: ".em-inventory-follow",
            attr: "data-id",
            formated: "$(name)",
            query: ["_id"],
            fk: "_id",
            version: 2,
        },
        {
            url: window.API_SERVICE_URL_V2 + "/inventory/follow_details",
            dom: ".em-inventory-follow_detail",
            attr: "data-id",
            formated: "$(name)",
            query: ["_id"],
            fk: "_id",
            version: 2,
        },

        {
            url: window.API_SERVICE_URL + "/finance/wallets",
            dom: ".finance_wallets",
            attr: "data-id",
            formated: "$(name)",
            query: ["_id"],
            fk: "_id",
            version: 2,
        },
        {
            url: window.API_SERVICE_URL + "/finance/vouchers-category",
            dom: ".finance_vouchers_category",
            attr: "data-id",
            formated: "$(name)",
            query: ["_id"],
            fk: "_id",
            version: 2,
        },
        {
            url: window.API_SERVICE_URL + "/finance/vouchers",
            dom: ".finance_vouchers",
            attr: "data-id",
            formated: "$(name)",
            query: ["_id"],
            fk: "_id",
            version: 2,
        },
        {
            url: window.API_SERVICE_URL_V2 + "/inventory/stores",
            dom: ".em-stores",
            attr: "data-id",
            formated: "$(name)",
            fk: "_id",
            version: 2,
        },
        {
            url: window.API_SERVICE_URL_V2 + "/inventory/supplier",
            dom: ".em-supplier",
            attr: "data-id",
            formated: "$(name)",
            fk: "_id",
            version: 2,
        },

        {
            url: window.API_SERVICE_URL_V2 + "/inventory/category",
            dom: ".em-category",
            attr: "data-id",
            formated: "$(name)",
            fk: "_id",
            version: 2,
        },
        {
            url: window.API_SERVICE_URL_V2 + "/inventory/product_brand",
            dom: ".em-inventory-brand",
            attr: "data-id",
            formated: "$(name)",
            fk: "_id",
            version: 2,
        },

        {
            url: window.API_SERVICE_URL_V2 + "/inventory/products_shipment",
            dom: ".em-shipment",
            attr: "data-id",
            formated: "$(name)",
            fk: "_id",
            version: 2,
        },

        {
            url: window.API_SERVICE_URL_V2 + "/inventory/products",
            dom: ".em-products",
            attr: "data-id",
            formated: "$(name)",
            link: "/inventory/product/$(_id)",
            fk: "_id",
            version: 2,
        },
        {
            url: window.API_SERVICE_URL_V2 + "/inventory/order_group",
            dom: ".em-order_group",
            attr: "data-id",
            formated: "$(name)",
            fk: "_id",
            version: 2,
        },

        //support
        {
            url: window.API_SERVICE_URL_V2 + "/support/flow",
            dom: ".em-flow",
            attr: "data-id",
            formated: "$(name)",
            fk: "_id",
            version: 2,
        },
        ////////////NOTIFICATION/////////////
        {
            url: window.API_SERVICE_URL_V2 + "/notification/template",
            dom: ".em-notification-template",
            attr: "data-id",
            formated: "$(name)",
            fk: "_id",
            version: 2,
        },
        //////////Call center//////////
        {
            url: window.API_SERVICE_URL_V2 + "/call-center/ticket-topics",
            dom: ".em-ticket-topic",
            attr: "data-id",
            formated: "$(name)",
            fk: "_id",
            version: 2,
        },
        /////////End call center//////
        {
            url: window.API_SERVICE_URL_V2 + "/core/services",
            dom: ".em-core-service",
            attr: "data-id",
            formated: "$(name)",
            fk: "_id",
            version: 2,
        },
        {
            url: window.API_SERVICE_URL_V2 + "/core/events",
            dom: ".em-core-event",
            attr: "data-id",
            formated: "$(name)",
            fk: "_id",
            version: 2,
        },
        {
            url: window.API_SERVICE_URL_V2 + "/core/listeners",
            dom: ".em-core-listener",
            attr: "data-id",
            formated: "$(name)",
            fk: "_id",
            version: 2,
        },
        //////////Task backend v2//////////
        {
            url: window.API_SERVICE_URL_V2 + "/task/projects",
            dom: ".em-project",
            attr: "data-id",
            formated: "$(name)",
            fk: "_id",
            version: 2,
        },
        {
            url: window.API_SERVICE_URL_V2 + "/task/category",
            dom: ".em-task-category",
            attr: "data-id",
            formated: "$(name)",
            fk: "_id",
            version: 2,
        },
        /////////End task backend v2//////
    ];

    //
    // Setup module components
    //

    // Basic Datatable examples
    var replaceData = function (parentDom) {
        $.each(arrDomAutoFill, function (idx, item) {
            var focusDom = parentDom.find(item.dom);
            if (!focusDom.length) {
                return true;
            }

            /////////// FIX TAM CHO CAC DOM DANG CHAY ///////////

            /////////////  END //////////////////

            //if (item.pquery) {
            var arrId = [];
            focusDom.each(function () {
                var selfDom = $(this);
                if (selfDom.prop("tagName") == "SELECT") {
                    selfDom.find("option").each(function () {
                        var v = $(this).val();
                        if (v && $.inArray(v, arrId) == -1) {
                            arrId.push(v);
                        }
                    });
                } else {
                    var v = selfDom.attr(item.attr);

                    if (v && $.inArray(v, arrId) == -1) {
                        arrId.push(v);
                    }
                }
            });
            if (!arrId.length) {
                return;
            }
            arrId = arrId.filter(unique);
            var count = 1;
            if (arrId.length > 200) {
                // lay so lam tron len
                count = Math.ceil(arrId.length / 200);
            }
            for (i = 1; i <= count; i++) {
                var objParams = {};

                var inqId = arrId.slice((i - 1) * 200, 200 * i);
                if (item.version == 2) {
                    objParams[item.fk] = inqId;
                } else {
                    objParams[item.fk] = { inq: inqId };
                }

                //replace url arg
                var urlQuery = item.url;
                if (item.url_arg) {
                    $.each(item.url_arg, function (k, v) {
                        urlQuery = urlQuery.replace(
                            "{" + k + "}",
                            objParams[v]
                        );
                        delete objParams[v];
                    });
                }
                var dataGet = {};
                if (!$.isEmptyObject(objParams)) {
                    if (item.version == 2) {
                        dataGet = { filter: objParams, limit: 1000 };
                    } else {
                        dataGet = {
                            filter: JSON.stringify({
                                where: objParams,
                                limit: 500,
                            }),
                        };
                    }
                }
                //console.log(urlQuery,objParams);
                // ktra query bat buoc
                $.ajax({
                    url: urlQuery,
                    type: "GET",
                    dataType: "json",
                    // xhrFields: {
                    //   withCredentials: true
                    // },
                    data: dataGet,
                    contentType:
                        "application/x-www-form-urlencoded; charset=UTF-8",
                    // beforeSend: function(xhr) {
                    //     //console.log('test',xhr);
                    // },
                    headers: {
                        Authorization:
                            "Bearer " + getCookie("imap_authen_access_token"),
                    },
                    success: function (response) {
                        if (response.error) {
                            ////console.log(data);
                            return false;
                        }
                        var new_str = item.formated;
                        var new_link = item.link;
                        var objData = {};
                        objLink = {};
                        $.each(response, function (key, value) {
                            objData[value[item.fk]] = value;
                        });
                        focusDom.each(function () {
                            if ($(this).prop("tagName") == "SELECT") {
                                var selectData = $(this);
                                var tmp = $(this).attr("data-format")
                                    ? $(this).attr("data-format")
                                    : new_str;

                                selectData
                                    .find("option")
                                    .each(function (element, key) {
                                        var v = $(this).val();
                                        if (objData[v]) {
                                            var replaced = formatReplace(
                                                tmp,
                                                objData[v]
                                            );
                                            $(this).text(replaced);
                                            setTimeout(function () {
                                                selectData.trigger(
                                                    "change_select2"
                                                );
                                            }, 1000);
                                        }
                                    });
                                selectData.trigger("change");
                            } else {
                                var v = $(this).attr(item.attr);
                                if (objData[v]) {
                                    var tmp = $(this).attr("data-format")
                                        ? $(this).attr("data-format")
                                        : new_str;
                                    if (new_link) {
                                        $(this).html(
                                            '<a href="' +
                                                formatReplace(
                                                    new_link,
                                                    objData[v]
                                                ) +
                                                '" class="load_not_ajax" target="_blank">' +
                                                formatReplace(tmp, objData[v]) +
                                                "</a>"
                                        );
                                    } else {
                                        $(this).text(
                                            formatReplace(tmp, objData[v])
                                        );
                                    }
                                }
                            }
                        });
                    },
                    error: function () {},
                });
            }
        });
    };
    var selectData = function (parentDom) {
        var __cache = [];
        parentDom.find(".select2_suggest").each(function () {
            var self = $(this);
            loadSelectData(self);
            $(this).bind("change_select2", function (e) {
                var getID = $(this).select2("data");
                //console.log(getID[0]['_resultId']);
                var resultID = getID[0]["_resultId"];

                var res = resultID.split("-result-");

                //.text("TEST");
                $("#" + res[0] + "-container").html(
                    $("#" + res[0] + "-container")
                        .find("span")
                        .prop("outerHTML") + self.find("option:selected").text()
                );
            });
        });
    };

    var loadSelectData = function (current_dom, option = {}) {
        var dataTable = option.module || current_dom.attr("data-module");
        var showType = option.show || current_dom.attr("data-show");
        if (!dataTable) {
            return false;
        }
        var objData = objSelect2Suggest[dataTable];

        if (typeof objSelect2Suggest == "undefined" || !objData) {
            console.log("Suggest data" + dataTable + " not found");
            return false;
        }
        var urlLoad = objData.url || "";
        if (!urlLoad) {
            console.log("Thieu config cho suggest");
            return false;
        }
        var objParams = {};
        if (typeof option.query != "undefined") {
            $.each(option.query, function (qidx, qkey) {
                if (typeof objData["url_to_" + qidx] != "undefined") {
                    urlLoad = formatReplace(objData["url_to_" + qidx], {
                        [qidx]: qkey,
                    });
                } else {
                    if (objData.version == 2) {
                        objParams[qidx] = qkey;
                    } else {
                        if (typeof qkey == "object") {
                            objParams[qidx] = { inq: qkey };
                        } else {
                            objParams[qidx] = { eq: qkey };
                        }
                    }
                }
            });
        } else if (typeof objData.query != "undefined") {
            $.each(objData.query, function (qidx, qkey) {
                var queryKey = qkey;
                if (qkey == "_id") {
                    queryKey = "id";
                }
                var objQuery = current_dom.attr("data-query-" + queryKey);
                if (objQuery) {
                    if (typeof objData["url_to_" + qkey] != "undefined") {
                        urlLoad = formatReplace(objData["url_to_" + qkey], {
                            [qkey]: objQuery,
                        });
                    } else {
                        /////////// API MOI ///////////
                        if (objData.version == 2) {
                            if (objQuery.indexOf(",") > 0) {
                                objQuery = objQuery.split(",");
                            }
                            objParams[qkey] = objQuery;
                        } else {
                            if (objQuery.indexOf(",") > 0) {
                                objQuery = objQuery.split(",");
                                objParams[qkey] = { inq: objQuery };
                            } else {
                                objParams[qkey] = { eq: objQuery };
                            }
                        }
                    }
                }
            });
        }
        var search_param = objData.search_param || "";
        //console.debug(objParams);
        var minimumInputLength =
            (typeof showType == "undefined" || showType != "all") &&
            search_param
                ? 2
                : 0;
        var limit = search_param ? 50 : 500;
        var __cache = [];
        current_dom.select2({
            minimumInputLength: minimumInputLength,
            allowClear: true,
            closeOnSelect: false,
            cache: true,
            placeholder: current_dom.attr("placeholder") || "Select an option",
            ajax: {
                url: urlLoad,
                dataType: "json",
                delay: 300,
                cache: true,
                data: function (params) {
                    var query = {};
                    if (minimumInputLength > 0) {
                        if (search_param == "keyword") {
                            var moreParams = { keyword: params.term };
                        } else {
                            if (objData.version == 2) {
                                query = {
                                    [search_param]: { like: params.term },
                                };
                            } else {
                                query = {
                                    [search_param]: {
                                        like: "%" + params.term + "%",
                                    },
                                };
                            }
                        }
                    }
                    $.extend(query, objParams);
                    var offset =
                        params.page > 1 ? (params.page - 1) * limit : 0;
                    if (objData.version == 2) {
                        var result = {
                            filter: query,
                            limit: limit,
                            offset: offset,
                        };
                    } else {
                        var result = {
                            filter: JSON.stringify({
                                where: query,
                                limit: limit,
                                offset: offset,
                            }),
                        };
                    }

                    if (typeof moreParams != "undefined") {
                        $.extend(result, moreParams);
                    }
                    return result;
                },
                headers: {
                    Authorization:
                        "Bearer " + getCookie("imap_authen_access_token"),
                },
                processResults: function (data, params) {
                    if (data.error) {
                        //console.log(data);
                        return false;
                    }
                    var term = stringToSlug($.trim(params.term).toLowerCase());
                    //console.log(params);
                    var new_str = objData.formated;
                    var tmp = current_dom.attr("data-format")
                        ? current_dom.attr("data-format")
                        : new_str;
                    // dung de thay doi key khac id
                    var tmp_val = current_dom.attr("data-format-val")
                        ? current_dom.attr("data-format-val")
                        : "$(" + objData.id + ")";
                    var html = objData.html || "";
                    var dataResult = [];
                    $.each(data, function (item_key, item) {
                        //console.log(tmp,item);
                        if (item) {
                            var replaced = formatReplace(tmp, item);
                            var valReplaced = formatReplace(tmp_val, item);
                            var htmlReplace = !html
                                ? replaced
                                : formatReplace(html, item);
                            if (params.term && !search_param) {
                                if (
                                    stringToSlug(
                                        replaced.toLowerCase()
                                    ).indexOf(term) > -1
                                ) {
                                    dataResult.push({
                                        id: valReplaced,
                                        text: replaced,
                                        html: htmlReplace,
                                    });
                                }
                            } else {
                                dataResult.push({
                                    id: valReplaced,
                                    text: replaced,
                                    html: htmlReplace,
                                });
                            }
                        }
                    });
                    //console.log(dataResult);
                    // Transforms the top-level key of the response object from 'items' to 'results'
                    return {
                        results: dataResult,
                        pagination: {
                            more: dataResult.length == limit ? true : false,
                        },
                    };
                },
                transport: function (params, success, failure) {
                    //retrieve the cached key or default to _ALL_
                    //console.log(params);
                    var __cachekey = params.url + "?" + $.param(params.data);
                    if ("undefined" !== typeof __cache[__cachekey]) {
                        success(__cache[__cachekey]);
                        return;
                    }
                    var $request = $.ajax(params);
                    $request.then(function (data) {
                        //store data in cache
                        __cache[__cachekey] = data;
                        //display the results
                        success(__cache[__cachekey]);
                    });
                    $request.fail(failure);
                    //return $request;
                },
            },
            templateResult: function (data) {
                return $($.parseHTML(data.html));
            },
        });
    };
    $.fn.loadSuggestData = function (params) {
        var o = $(this[0]); // This is the element
        loadSelectData($(this), params);
        return this; // This is needed so other functions can keep chaining off of this
    };

    //
    // Return objects assigned to module
    //

    return {
        init: function (parentDom) {
            //console.log(parentDom);
            replaceData(parentDom);
            selectData(parentDom);
        },
    };
})();
// Initialize module
// ------------------------------
$(document).on("DOMContentLoaded MainContentReloaded", function (e) {
    AutoloadDataService.init($(e.target));
});
